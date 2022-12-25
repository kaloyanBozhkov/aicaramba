import { Currency, ProductStatus } from '@prisma/client'

export interface IProductProps {
  id: string

  colorScheme: string

  currency: Currency

  name: string

  price: number

  status: ProductStatus

  style: string
}

export default class Product {
  id: string

  colorScheme: string

  currency: Currency

  name: string

  price: number

  status: ProductStatus

  style: string

  imgSrc: string

  url: string

  constructor(product: IProductProps) {
    this.colorScheme = product.colorScheme
    this.currency = product.currency
    this.name = product.name
    this.price = product.price
    this.status = product.status
    this.style = product.style
    this.id = product.id

    this.imgSrc = Product.getProductImageURL(this.id)
    this.url = Product.getProductPageURL(this.id)
  }

  static getProductPageURL = (id: string) => `/artwork/${id}`

  static getProductImageURL = (id: string) => `/products/${id}.png`
}
