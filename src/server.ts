import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createAccommodation } from './routes/AccommodationRoutes/create-accommodation'
import { deleteAccommodation } from './routes/AccommodationRoutes/delete-accommodation'
import { updateAccommodation } from './routes/AccommodationRoutes/update-accommodation'
import { showAccommodation } from './routes/AccommodationRoutes/show-accommodation'

import { createUser } from './routes/UserRoutes/create-user'
import { updateUser } from './routes/UserRoutes/update-user'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createAccommodation)
app.register(deleteAccommodation)
app.register(updateAccommodation)
app.register(showAccommodation)

app.register(createUser)
app.register(updateUser)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running!')
  })
