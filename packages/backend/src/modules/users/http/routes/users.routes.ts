import { FastifyInstance, FastifyServerOptions } from 'fastify'

export async function userRoutes(
  fastify: FastifyInstance,
  options: FastifyServerOptions
) {
  await fastify.register(import('@fastify/rate-limit'), {
    max: 5,
    timeWindow: '1 minute',
  })
  fastify.get('/', async (request, reply) => {
    return reply.status(201).send()
  })
}
