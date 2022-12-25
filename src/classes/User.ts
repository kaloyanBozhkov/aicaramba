import { Currency } from '@prisma/client'

export default class User {
  id: string

  email: string

  alias: string

  createdAt: string

  updatedAt: string

  currency: Currency

  constructor({
    id,
    email,
    alias,
    createdAt,
    updatedAt,
    currency,
  }: {
    id: string
    email: string
    alias: string
    createdAt: string
    updatedAt: string
    currency: Currency
  }) {
    this.id = id
    this.email = email
    this.alias = alias
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.currency = currency
  }
}
