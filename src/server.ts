import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createAccommodation } from './routes/create-accommodation'
import { createUser } from './routes/create-user'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createAccommodation)
app.register(createUser)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running!')
  })
