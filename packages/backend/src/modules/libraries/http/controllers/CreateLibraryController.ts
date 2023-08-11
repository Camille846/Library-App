import { CreateLibraryService } from '@modules/libraries/services/CreateLibraryService'
import { AppError } from '@shared/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import zod from 'zod'

interface Request extends FastifyRequest {
  userId: string
}

export class CreateLibraryController {
  async handle(req: Request, reply: FastifyReply) {
    const requestSchema = zod.object({
      name: zod.string(),
    })

    type IInputUser = zod.infer<typeof requestSchema>

    let inputUser: IInputUser = {} as IInputUser

    try {
      inputUser = requestSchema.parse(req.body)
    } catch (err) {
      const errors: string[] = []

      if (err instanceof zod.ZodError) {
        console.log(err)
        for (const error in err.issues) {
          errors.push(err.issues[error].message)
        }

        throw new AppError(errors, 409)
      }
    }
    const createLibraryService = container.resolve(CreateLibraryService)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.userId!

    createLibraryService.execute({ name: inputUser.name, userId })

    reply.status(201)
  }
}
