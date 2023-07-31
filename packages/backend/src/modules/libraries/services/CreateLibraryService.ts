import { injectable, inject } from 'tsyringe'
import { ILibrariesRepository } from '../repositories/ILibrariesRepository'

interface IRequest {
  userId: string
  name: string
}

@injectable()
export class CreateLibraryService {
  constructor(@inject('LibrariesRepository') private librariesRepository: ILibrariesRepository) {}
  async execute({ name, userId }: IRequest) {
    await this.librariesRepository.createLibrary(name, userId)
  }
}
