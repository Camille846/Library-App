import 'reflect-metadata'
import { faker } from '@faker-js/faker'
import { CreateLibraryService } from './CreateLibraryService'
import { FakeLibraryRepository } from '../repositories/fakes/FakeLibraryRepository'

let createLibraryService: CreateLibraryService
let librariesRepository: FakeLibraryRepository

describe('Create Library ', () => {
  beforeEach(() => {
    librariesRepository = new FakeLibraryRepository()

    createLibraryService = new CreateLibraryService(librariesRepository)
  })
  test('user should able to create a library', async () => {
    const library = {
      name: String(faker.internet.domainName),
      userId: 'e9ufhgsed8fgsd8f7sd9hfio',
    }

    const response = await createLibraryService.execute(library)

    expect(response)
  })
})
