import { NextApiRequest, NextApiResponse } from 'next'
import { AuthService } from '../../../services/auth.service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    const authService = new AuthService()

    const user = await authService.login(email, password)
    if (user) {
      return res.status(200).json({ message: 'Успішний вхід', user })
    }
    return res.status(401).json({ message: 'Невірні облікові дані' })
  }
  res.status(405).json({ message: 'Метод не дозволений' })
}
