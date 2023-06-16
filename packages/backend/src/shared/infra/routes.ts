import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from 'fastify'
import { userRoutes } from '@modules/users/http/routes/users.routes'
import { authenticate } from './plugins/authenticate'
import { libraryRoutes } from '@modules/libraries/http/routes/library.routes'

export async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
  fastify.register(userRoutes, { prefix: 'users' })
  fastify.register(libraryRoutes, { prefix: 'libraries' })

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}
