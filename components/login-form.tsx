"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginFormProps {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("email")?.setAttribute("autocomplete", "username")
      document
        .getElementById("password")
        ?.setAttribute("autocomplete", "current-password")
    }, 100)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("authToken", "someAuthToken") // Симуляція збереження токена
        onSuccess()
        router.push("/") // Перенаправляємо на головну
      } else {
        setErrorMessage(data.message || "Помилка авторизації")
      }
    } catch (error) {
      setErrorMessage("Помилка з’єднання з сервером")
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6")}
      onSubmit={handleSubmit}
      autoComplete="on"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      {errorMessage && (
        <p className="text-center text-red-500">{errorMessage}</p>
      )}
    </form>
  )
}
