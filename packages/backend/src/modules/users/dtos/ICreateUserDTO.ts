export interface ICreateUserDTO {
  id?: string
  full_name: string
  username: string
  email: string
  password: string
  provider?: string
}
