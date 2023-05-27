import { v4 } from 'uuid'

export class Book {
  public readonly id: string

  public name: string
  public url: string

  constructor(props: Omit<Book, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) this.id = v4()
  }
}
