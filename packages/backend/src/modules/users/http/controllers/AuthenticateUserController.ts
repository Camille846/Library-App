import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { CreateUserService } from '../../services/CreateUserService'
import zod, { ZodIssue } from 'zod'
import { AppError } from '@shared/errors/AppError'
import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'

export class AuthenticateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestSchema = zod.object({
      email: zod.string().email(),
      password: zod.string(),
    })

    const authenticateUser = container.resolve(AuthenticateUserService)

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

    const token = await authenticateUser.execute(inputUser)

    reply.code(200).send(token)
  }
}
