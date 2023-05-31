import { container } from 'tsyringe'

import { FakeHashProvider } from './HashProvider/fakes/FakeHashProvider'
import { IHashProvider } from './HashProvider/models/IHashProvider'

container.registerSingleton<IHashProvider>('HashProvider', FakeHashProvider)
