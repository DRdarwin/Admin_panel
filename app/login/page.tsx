'use client'

import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/login-form'
import { LoginHeader } from '@/components/login-header'
import { GalleryVerticalEnd } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()

  const handleLoginSuccess = () => {
    router.push('/')
  }

  return (
    <>
      <LoginHeader />
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Admin Panel
          </a>
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>
    </>
  )
}
