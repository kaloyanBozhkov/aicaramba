import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

import { CURRENCY, MAX_AMOUNT, MIN_AMOUNT } from 'utils/stripe/constants'
import { formatAmountForStripe } from 'utils/stripe/stripeHelpers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

type PayloadBody = {
  amount: number
  items: {
    price: number
    img: string
    id: string
    name: string
    desc: string
  }[]
}

const shippingCosts: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 3 },
        maximum: { unit: 'business_day', value: 15 },
      },
      display_name: 'fast without tracking',
      fixed_amount: {
        amount: formatAmountForStripe(9.2, CURRENCY),
        currency: CURRENCY,
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 3 },
        maximum: { unit: 'business_day', value: 15 },
      },
      display_name: 'fast with tracking',
      fixed_amount: {
        amount: formatAmountForStripe(11.7, CURRENCY),
        currency: CURRENCY,
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 3 },
        maximum: { unit: 'business_day', value: 15 },
      },
      display_name: 'fast with tracking and signature',
      fixed_amount: {
        amount: formatAmountForStripe(13, CURRENCY),
        currency: CURRENCY,
      },
    },
  },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // @TODO get cart from DB for user ID instead of passing all cart items here
  if (req.method === 'POST') {
    const { amount, items } = req.body as PayloadBody
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) throw new Error('Invalid amount.')

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
          mode: 'payment',
          submit_type: 'pay',
          payment_method_types: ['card'],
          line_items: items.map((p) => ({
            price_data: {
              unit_amount: formatAmountForStripe(p.price, CURRENCY),
              currency: CURRENCY,
              product_data: {
                images: [`${req.headers.origin}${p.img}`],
                name: p.name,
                description: p.desc,
                metadata: {
                  id: p.id,
                  desc: p.desc,
                  img: `${req.headers.origin}${p.img}`,
                },
              },
            },
            quantity: 1,
          })),
          billing_address_collection: 'required',
          cancel_url: `${req.headers.origin}/bag`,
          success_url: `${req.headers.origin}/order?session_id={CHECKOUT_SESSION_ID}`,
          custom_text: {
            submit: {
              message: 'Are you ready to become the owner of these unique T-Shirts?!',
            },
            shipping_address: {
              message: 'For more info, contact us at support@aicaramba.io',
            },
          },
          customer_creation: 'always',
          // customer: 'customerID',
          shipping_address_collection: { allowed_countries: ['US', 'CA', 'BG'] },
          shipping_options:
            amount >= 80
              ? [
                  {
                    shipping_rate_data: {
                      type: 'fixed_amount',
                      delivery_estimate: {
                        minimum: { unit: 'business_day', value: 3 },
                        maximum: { unit: 'business_day', value: 15 },
                      },
                      display_name: 'Free',
                      fixed_amount: {
                        amount: formatAmountForStripe(0, CURRENCY),
                        currency: CURRENCY,
                      },
                    },
                  },
                ]
              : shippingCosts,
        },
        checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)

      console.log('checkoutSession', checkoutSession)

      res.status(200).json(checkoutSession.id)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
