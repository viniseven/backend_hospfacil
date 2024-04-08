import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { FastifyInstance } from 'fastify'

export async function createAccommodation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/accommodations',
    {
      schema: {
        body: z.object({
          name: z.string().min(8),
          city: z.string(),
          country: z.string(),
          category: z.string(),
          price: z.number().min(-Infinity).max(Infinity).nonnegative(),
          about: z.string(),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, city, country, category, price, about } = request.body

      const checkAccommodationNameExist = await prisma.accommodation.findUnique(
        {
          where: {
            name,
          },
        },
      )

      if (checkAccommodationNameExist !== null) {
        throw new Error('Accommodation name already exists')
      }

      await prisma.accommodation.create({
        data: {
          name,
          city,
          country,
          category,
          price,
          about,
        },
      })

      return reply.status(201).send({ message: 'Accommodation create success' })
    },
  )
}
