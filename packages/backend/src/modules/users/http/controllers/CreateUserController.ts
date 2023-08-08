import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { CreateUserService } from '../../services/CreateUserService'
import zod from 'zod'
import { AppError } from '@shared/errors/AppError'

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestSchema = zod.object({
      full_name: zod.string(),
      username: zod.string(),
      email: zod.string().email(),
      password: zod.string().min(8, 'Password must have at least 8 caracteries'),
    })

    const createUser = container.resolve(CreateUserService)

    type IInputUser = zod.infer<typeof requestSchema>

    let inputUser: IInputUser = {} as IInputUser

    try {
      inputUser = requestSchema.parse(request.body)
    } catch (err) {
      const errors: string[] = []
      if (err instanceof zod.ZodError) {
        for (const error in err.issues) {
          errors.push(err.issues[error].message)
        }

        throw new AppError(errors, 409)
      }
    }

    const token = await createUser.execute(inputUser)

    reply.code(201).send({ token })
  }
}
