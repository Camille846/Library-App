import { authenticate } from '@shared/infra/plugins/authenticate'
import { FastifyInstance } from 'fastify'
import { CreateLibraryController } from '../controllers/CreateLibraryController'

const createLibraryController = new CreateLibraryController()

export async function libraryRoutes(fastify: FastifyInstance) {
  fastify.post('/new', { preHandler: authenticate }, createLibraryController.handle)
}
