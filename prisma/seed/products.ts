import { randomUUID } from 'crypto'
import fs from 'fs'

import { Currency, PrismaClient, ProductStatus } from '@prisma/client'

// export if needed by other seed
export const products = [
  // new
  {
    id: randomUUID(),
    name: 'a unicorn driving a Lamborghini in outer space with the moon visible',
    status: ProductStatus.NEW,
    currency: Currency.EUR,
    price: 50,
    style: 'digital art',
    colorScheme: 'random',
  },
  {
    id: randomUUID(),
    name: 'Cthulu smoking a blunt while the earth is burning',
    status: ProductStatus.NEW,
    currency: Currency.EUR,
    price: 50,
    style: 'digital art',
    colorScheme: 'cyberpunk',
  },
  {
    id: randomUUID(),
    name: 'a girl riding a hippopotamus during a sunset in the middle of a field with giant rocks around',
    status: ProductStatus.NEW,
    currency: Currency.EUR,
    price: 50,
    style: 'digital art',
    colorScheme: 'cyberpunk',
  },
  {
    id: randomUUID(),
    name: 'a futuristic motorbike',
    status: ProductStatus.NEW,
    currency: Currency.EUR,
    price: 50,
    style: 'digital art',
    colorScheme: 'cyberpunk',
  },
  {
    id: randomUUID(),
    name: 'doggo licking catatafish in a pool on a mountain during a sunny day',
    status: ProductStatus.NEW,
    currency: Currency.EUR,
    price: 50,
    style: 'digital art',
    colorScheme: 'cyberpunk',
  },
  {
    id: randomUUID(),
    name: 'Post apocalyptic image of the last hamburger on the planet',
    status: ProductStatus.NEW,
    currency: Currency.EUR,
    price: 50,
    style: 'digital art',
    colorScheme: 'random',
  },
  {
    id: randomUUID(),
    name: 'A fox riding a rhino in the jungle',
    status: ProductStatus.NEW,
    currency: Currency.EUR,
    price: 50,
    style: '3d render',
    colorScheme: 'rainbow',
  },
  // fire
  {
    id: randomUUID(),
    name: 'Cthulhu riding a motorbike over the moon',
    status: ProductStatus.FIRE,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'cyberpunk',
  },
  {
    id: randomUUID(),
    name: 'a woman with eagle wings in the forest at night with stars in the sky',
    status: ProductStatus.FIRE,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'cyberpunk',
  },
  {
    id: randomUUID(),
    name: 'A creepy skeleton head exhaling fire onto a mould infected apple',
    status: ProductStatus.FIRE,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'cyberpunk',
  },
  {
    id: randomUUID(),
    name: 'Biker cat wearing a bandana and sunglasses riding a motorbike in the rain on the highway',
    status: ProductStatus.FIRE,
    currency: Currency.EUR,
    price: 50,
    style: 'digital art',
    colorScheme: 'cyberpunk',
  },
  {
    id: randomUUID(),
    name: 'A wolf warrior wearing viking armour with battle scars marching into a fight in the middle of a forest that is on fire',
    status: ProductStatus.FIRE,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'cyberpunk',
  },
  {
    id: randomUUID(),
    name: 'A Russian bear reading a book while riding a boat in a sunny day at the lake',
    status: ProductStatus.FIRE,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'random',
  },
  {
    id: randomUUID(),
    name: 'Pineapple monster inside a closet',
    status: ProductStatus.FIRE,
    currency: Currency.EUR,
    price: 30,
    style: '3d render',
    colorScheme: 'rainbow',
  },
  {
    id: randomUUID(),
    name: 'a bear shaving himself in his jungle bathroom',
    status: ProductStatus.FIRE,
    currency: Currency.EUR,
    price: 30,
    style: '3d render',
    colorScheme: 'rainbow',
  },
  // sold
  {
    id: randomUUID(),
    name: 'an old and rusty robot looking through t-shirt in a wasteland',
    status: ProductStatus.SOLD,
    currency: Currency.EUR,
    price: 50,
    style: 'digital art',
    colorScheme: 'random',
  },
  {
    id: randomUUID(),
    name: 'Robot cat proudly demonstrating its freshly finished painting',
    status: ProductStatus.SOLD,
    currency: Currency.EUR,
    price: 50,
    style: 'digital art',
    colorScheme: 'random',
  },
  {
    id: randomUUID(),
    name: 'a cat looking at a pond full of koi fish',
    status: ProductStatus.SOLD,
    currency: Currency.EUR,
    price: 50,
    style: 'as drawn by Vincent van Gogh',
    colorScheme: 'random',
  },
  {
    id: randomUUID(),
    name: 'a cat fighting a fierce bear in the middle of a forest on fire',
    status: ProductStatus.SOLD,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'cyberpunk',
  },
  {
    id: randomUUID(),
    name: 'doggo licking catatafish in a pool on a mountain during a sunny day',
    status: ProductStatus.SOLD,
    currency: Currency.EUR,
    price: 50,
    style: 'digital art',
    colorScheme: 'cyberpunk',
  },
  {
    id: randomUUID(),
    name: 'A muscular god destroying humans in a scary way',
    status: ProductStatus.SOLD,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'random',
  },
  // gone
  {
    id: randomUUID(),
    name: 'A panda samurai fighting an evil duck in the middle of Tokyo at night and it’s raining',
    status: ProductStatus.GONE,
    currency: Currency.EUR,
    price: 30,
    style: 'photorealistic image',
    colorScheme: 'random',
  },
  {
    id: randomUUID(),
    name: 'A pile of money surrounded by bananas and tigers in a wrestling cage',
    status: ProductStatus.GONE,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'random',
  },
  {
    id: randomUUID(),
    name: 'a dog jumping towards a ball hanging from a tree in a garden',
    status: ProductStatus.GONE,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'random',
  },
  {
    id: randomUUID(),
    name: 'two lost souls swimming in a fish bowl',
    status: ProductStatus.GONE,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'random',
  },
  {
    id: randomUUID(),
    name: 'the end of humanity',
    status: ProductStatus.GONE,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'random',
  },
  {
    id: randomUUID(),
    name: 'a man covered in dust drilling down a wall',
    status: ProductStatus.GONE,
    currency: Currency.EUR,
    price: 30,
    style: 'digital art',
    colorScheme: 'random',
  },
]

export const productsSeed = async (prisma: PrismaClient) => {
  // get roducts
  const existingP = await (
      await prisma.product.findMany({ select: { name: true } })
    ).map(({ name }) => name.toLowerCase()),
    // filter out existing products
    data = products.filter((p) => !existingP.includes(p.name.toLowerCase()))

  // create new ones only
  await prisma.product.createMany({
    data,
  })
}

fs.readdir(`${__dirname}/assets`, (err, files) => {
  products.forEach((p) => {
    const found = files.find((fileName) => fileName.toLowerCase().includes(p.name.toLowerCase()))

    if (!found) {
      console.error('did not find file for', p.name)
      return
    }

    fs.copyFile(
      `${__dirname}/assets/${found}`,
      `${process.cwd()}/public/products/${p.id}.png`,
      (err) => {
        if (err) console.error(`failed to copy & paste asset for ${p.id}`, err)
      }
    )
  })
})
