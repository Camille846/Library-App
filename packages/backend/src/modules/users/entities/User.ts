import { v4 } from 'uuid'

export class User {
  public readonly id: string

  public name: string
  public fullname: boolean
  public email: string
  public password: string

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) this.id = v4()
  }
}
