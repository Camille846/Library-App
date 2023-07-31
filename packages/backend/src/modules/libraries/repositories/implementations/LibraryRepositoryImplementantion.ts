import { ICreateLibraryDTO } from '@modules/libraries/dtos/ICreateLibraryDTO'
import { prisma } from 'lib/prisma'
import { ILibrariesRepository } from '../ILibrariesRepository'

export class LibraryRepositoryImplementation implements ILibrariesRepository {
  async createLibrary(name: string, user_id: string): Promise<void> {
    await prisma.library.create({
      data: {
        name,
        user_id,
      },
    })
  }
  async findLibraryById(id: string): Promise<ICreateLibraryDTO | undefined> {
    const library = await prisma.library.findUnique({
      where: {
        id,
      },
    })
    if (library) return library
  }
}
