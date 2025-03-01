import fs from "fs/promises"
import path from "path"
import { NextRequest, NextResponse } from "next/server"

// Логіка авторизації через admin.json
async function getAdminData() {
  const filePath = path.join(process.cwd(), "data", "admin.json")
  const rawData = await fs.readFile(filePath, "utf-8")
  return JSON.parse(rawData).admin
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const admin = await getAdminData()

    if (email === admin.email && password === admin.password) {
      return NextResponse.json({ message: "✅ Вхід успішний", user: { email } })
    } else {
      return NextResponse.json(
        { message: "❌ Невірні облікові дані" },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json({ message: "❌ Помилка серверу" }, { status: 500 })
  }
}
