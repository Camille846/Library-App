export interface IHashProvider {
  hashPassword(password: string): Promise<string>
  comparePasswords(password: string, storagedHashedPassword: string): Promise<boolean>
}
