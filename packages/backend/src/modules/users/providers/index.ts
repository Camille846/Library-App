import { container } from 'tsyringe'
import { HashProviderImplemention } from './HashProvider/implementations/HashProviderImplemention'

import { IHashProvider } from './HashProvider/models/IHashProvider'
import { JWTProvider } from './JWTProvider/JWTProvider'
import { IJWTProvider } from './JWTProvider/models/IJWTProvider'
import { IRefreshToken } from './RefreshTokenProvider/models/IRefreshToken'
import { RefreshTokenProvider } from './RefreshTokenProvider/implementations/RefreshTokenProvider'

container.registerSingleton<IHashProvider>('HashProvider', HashProviderImplemention)

container.registerSingleton<IJWTProvider>('JWTProvider', JWTProvider)

container.registerSingleton<IRefreshToken>('RefreshTokenProvider', RefreshTokenProvider)
