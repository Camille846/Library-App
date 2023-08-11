import { RefreshTokenService } from '@modules/users/services/RefreshTokenService'
import { AppError } from '@shared/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import zod from 'zod'

export class RefreshTokenController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const requestSchema = zod.object({
      refresh_token: zod.string(),
    })
    const refreshTokenService = container.resolve(RefreshTokenService)

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

    const token = await refreshTokenService.execute(inputUser.refresh_token)

    reply.code(201).send({ token })
  }
}
