'use client'

import Image from 'next/image'

export function LoginHeader() {
  return (
    <header className="flex justify-center py-6">
      <div className="flex flex-col items-center">
        <Image src="/my-logo.png" alt="Логотип" width={100} height={100} />
        <h1 className="mt-2 text-xl font-bold">Specialized Air Services</h1>
      </div>
    </header>
  )
}
