import { PrismaClient } from '@prisma/client'
import { inferAsyncReturnType } from '@trpc/server'

// import { CreateNextContextOptions } from '@trpc/server/adapters/next'

export const prisma = new PrismaClient()

export async function createContext(/* _opts?: CreateNextContextOptions */) {
  return { prisma }
}

export type Context = inferAsyncReturnType<typeof createContext>
