import { IStorageProvider } from '../models/IStorageProvider'
import fs from 'fs'
import path from 'path'

export class DiskImplementation implements IStorageProvider {
  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(path.resolve('tmp', file), path.resolve('uploads', file))

    return file
  }
  async deleteFile(file: string): Promise<void> {
    fs.unlinkSync(`uploads/${file}`)
  }
}
