import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createAccommodation } from './routes/AccommodationRoutes/create-accommodation'
import { deleteAccommodation } from './routes/AccommodationRoutes/delete-accommodation'
import { updateAccommodation } from './routes/AccommodationRoutes/update-accommodation'

import { createUser } from './routes/UserRoutes/create-user'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createAccommodation)
app.register(deleteAccommodation)
app.register(updateAccommodation)

app.register(createUser)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running!')
  })
