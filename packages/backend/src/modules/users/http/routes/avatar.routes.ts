import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

interface Request extends FastifyRequest {
  params: any
}

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/avatars/:id', async (req: Request, reply: FastifyReply) => {
    const id = req.params.id
    return reply.sendFile(id)
  })
}
