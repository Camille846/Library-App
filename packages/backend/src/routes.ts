import { FastifyInstance, FastifyServerOptions } from 'fastify'

export async function routes(
  fastify: FastifyInstance,
  options: FastifyServerOptions
) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}
