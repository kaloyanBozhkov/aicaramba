import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id: string = req.query.id as string

  try {
    if (!id.startsWith('cs_')) throw Error('Incorrect CheckoutSession ID.')

    const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(id, {
      expand: [
        /* 'payment_intent',  */
        'shipping_cost.shipping_rate',
        'line_items',
        'customer',
        'line_items.data.price.product',
      ],
    })

    res.status(200).json(checkoutSession)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}
