import { container } from 'tsyringe'
import { HashProviderImplemention } from './HashProvider/implementations/HashProviderImplemention'

import { IHashProvider } from './HashProvider/models/IHashProvider'
import { JWTProvider } from './JWTProvider/JWTProvider'
import { IJWTProvider } from './JWTProvider/models/IJWTProvider'

container.registerSingleton<IHashProvider>('HashProvider', HashProviderImplemention)

container.registerSingleton<IJWTProvider>('JWTProvider', JWTProvider)
