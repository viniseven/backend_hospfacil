import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { hash } from 'bcrypt'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/create-user',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string(),
          password: z.string().min(8),
          confirm_password: z.string(),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password, confirm_password } = request.body

      const checkUserExists = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (checkUserExists) {
        return reply.status(401).send({ message: 'Email is in use' })
      }

      if (password !== confirm_password) {
        return reply.status(401).send({ message: 'Password do not match' })
      }

      const hashedPassword = await hash(password, 10)

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      })

      return reply.status(201).send({ message: 'User create success' })
    },
  )
}
