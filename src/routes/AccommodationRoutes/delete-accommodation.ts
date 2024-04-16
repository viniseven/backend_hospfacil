import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function deleteAccommodation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/accommodation/:id',
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
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

      await prisma.accommodation.delete({
        where: {
          id,
        },
      })

      return reply.status(200).send({ message: 'Accommodation delete success' })
    },
  )
}
