import { ProductStatus } from '@prisma/client'

export const isAvailable = (status: ProductStatus) => ['NEW', 'FIRE'].includes(status)
