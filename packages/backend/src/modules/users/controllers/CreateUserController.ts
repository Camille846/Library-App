import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { CreateUserService } from '../services/CreateUserService'
import zod from 'zod'

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestSchema = zod.object({
      full_name: zod.string(),
      username: zod.string(),
      email: zod.string().email(),
      password: zod.string(),
    })

    const createUser = container.resolve(CreateUserService)

    const inputUser = requestSchema.parse(request.body)

    const user = await createUser.execute(inputUser)

    reply.code(200).send(user)
  }
}
