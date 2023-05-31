import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(user: ICreateUserDTO) {
    this.usersRepository.createUser()
  }
}
