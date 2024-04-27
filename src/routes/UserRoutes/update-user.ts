import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { compare, hash } from 'bcrypt'

export async function updateUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/update-user',
    {
      schema: {
        body: z.object({
          name: z.string().optional(),
          oldPassword: z.string(),
          password: z.string().min(8),
        }),
        response: {},
      },
    },

    async (request, reply) => {
      const { name, oldPassword, password } = request.body

      const checkUserExists = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!checkUserExists) {
        return reply.status(404).send({ message: 'User already exist' })
      }

      if (!oldPassword) {
        return reply
          .status(401)
          .send({ message: 'Please enter the old password' })
      }

      if (oldPassword && password) {
        const checkOldPassword = await compare(
          oldPassword,
          checkUserExists.password,
        )

        if (!checkOldPassword) {
          return reply
            .status(401)
            .send({ message: 'The old password does not match' })
        }
      }

      const hashedPassword = await hash(password, 10)

      await prisma.user.update({
        data: {
          name,
          password: hashedPassword,
        },

        where: {
          id,
        },
      })

      return reply.status(201).send({ message: 'User updated success' })
    },
  )
}
