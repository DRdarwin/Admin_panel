import fs from 'fs'
import path from 'path'

export class AuthService {
  private adminDataPath = path.resolve('data/admin.json')

  async login(email: string, password: string) {
    const rawData = fs.readFileSync(this.adminDataPath, 'utf-8')
    const users = JSON.parse(rawData)

    if (users.admin.email === email && users.admin.password === password) {
      return { email }
    }
    return null
  }
}
