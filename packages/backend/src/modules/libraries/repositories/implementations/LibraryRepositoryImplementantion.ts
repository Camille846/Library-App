import { prisma } from 'lib/prisma'
import { ILibrariesRepository } from '../ILibrariesRepository'
import { Library } from '@prisma/client'

export class LibraryRepositoryImplementation implements ILibrariesRepository {
  async createLibrary(name: string, user_id: string): Promise<void> {
    await prisma.library.create({
      data: {
        name,
        user_id,
      },
    })
  }
  async findLibraryById(id: string): Promise<Library | undefined> {
    return (await prisma.library.findUnique({
      where: {
        id,
      },
    })) as Library | undefined
  }
}
