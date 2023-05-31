import 'reflect-metadata'

import Fastify from 'fastify'
import multer from 'fastify-multer'
import '@shared/container'
import '@modules/users/providers'
import '@shared/container/providers'
import { routes } from './routes'
import path from 'path'
const fastify = Fastify({
  logger: true,
})

fastify.register(import('@fastify/static'), {
  root: path.join(__dirname, '../uploads'),
  prefix: '/uploads/', // optional: default '/'
  // optional: default {}
})

async function rateLimit() {
  await fastify.register(import('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute',
  })
}
rateLimit()
fastify.register(multer.contentParser)
fastify.register(routes)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)

    process.exit(1)
  }
  console.log(fastify.printRoutes())
  // Server is now listening on ${address}
})
