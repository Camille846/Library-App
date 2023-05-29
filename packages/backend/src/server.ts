import Fastify from 'fastify'
import { routes } from './routes'

const fastify = Fastify({
  logger: true,
})

async function rateLimit() {
  await fastify.register(import('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute',
  })
}
rateLimit()
fastify.register(routes)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)

    process.exit(1)
  }
  console.log(fastify.printRoutes())
  // Server is now listening on ${address}
})
