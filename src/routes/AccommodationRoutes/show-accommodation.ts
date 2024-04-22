import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function showAccommodation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/accommodation/:id',
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {},
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const findAccommodation = await prisma.accommodation.findUnique({
        select: {
          id: true,
          name: true,
          city: true,
          country: true,
          imgAccommodation: true,
          category: true,
          price: true,
          about: true,
        },
        where: {
          id,
        },
      })

      if (findAccommodation === null) {
        throw new Error('Hospedagem não encontrada')
      }

      return reply.send({ findAccommodation })
    },
  )
}
