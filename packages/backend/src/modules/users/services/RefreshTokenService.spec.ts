import 'reflect-metadata'
import { faker } from '@faker-js/faker'
import { IRefreshToken } from '../providers/RefreshTokenProvider/models/IRefreshToken'
import { FakeRefreshTokenProvider } from '../providers/RefreshTokenProvider/fakes/FakeRefreshToken'

let refreshTokenProvider: IRefreshToken

describe('Refresh token ', () => {
  beforeEach(() => {
    refreshTokenProvider = new FakeRefreshTokenProvider()
  })
  test('Can create a valid refresh_Token', async () => {
    const userId = faker.string.uuid()

    const response = await refreshTokenProvider.createRefreshToken(userId)

    expect(response).toHaveProperty('id')
  })
  test('Can find a already created refresh token', async () => {
    const refresh_token = 'ertf890udf89'

    const response = await refreshTokenProvider.findRefreshToken(refresh_token)

    expect(response).toHaveProperty('id')
  })
  test('Can find a already created refresh token by user_id', async () => {
    const userId = 'e9ufhgsed8fgsd8f7sd9hfio'

    const response = await refreshTokenProvider.findRefreshTokenByUserId(userId)

    expect(response).toHaveProperty('id')
  })
})
