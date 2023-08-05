import { container } from 'tsyringe'
import { FakeStorageProvider } from './StorageProvider/fakes/FakeStorageProvider'
import { IStorageProvider } from './StorageProvider/models/IStorageProvider'

container.registerSingleton<IStorageProvider>('StorageProvider', FakeStorageProvider)
