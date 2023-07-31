import { Library } from '@prisma/client'
import { ICreateLibraryDTO } from '../dtos/ICreateLibraryDTO'

export interface ILibrariesRepository {
  createLibrary(name: string, user_id: string): Promise<void>
  findLibraryById(id: string): Promise<Library | undefined>
}
