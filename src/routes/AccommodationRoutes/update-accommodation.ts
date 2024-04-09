import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function updateAccommodation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/accommodations/:id',
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().min(8),
          city: z.string(),
          country: z.string(),
          category: z.string(),
          price: z.number().min(-Infinity).max(Infinity).nonnegative(),
          about: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const { name, city, country, category, price, about } = request.body

      await prisma.accommodation.update({
        where: {
          id,
        },

        data: {
          name,
          city,
          country,
          category,
          price,
          about,
        },
      })

      return reply
        .status(200)
        .send({ message: 'Accommodation was been updated ' })
    },
  )
}
