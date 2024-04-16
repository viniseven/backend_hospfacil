import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function updateAccommodation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/accommodation/:id',
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().optional(),
          city: z.string().optional(),
          country: z.string().optional(),
          category: z.string().optional(),
          price: z
            .number()
            .min(-Infinity)
            .max(Infinity)
            .nonnegative()
            .optional(),
          about: z.string().optional(),
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
        data: {
          name,
          city,
          country,
          category,
          price,
          about,
        },
        where: {
          id,
        },
      })

      return reply
        .status(200)
        .send({ message: 'Accommodation was been updated ' })
    },
  )
}
