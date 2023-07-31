import { container } from 'tsyringe'
import { HashProviderImplemention } from './HashProvider/implementations/HashProviderImplemention'

import { IHashProvider } from './HashProvider/models/IHashProvider'

container.registerSingleton<IHashProvider>('HashProvider', HashProviderImplemention)
