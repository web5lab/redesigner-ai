'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { UserSelector } from '@/store/global.Selector'
import Login from '@/components/pages/Login'

export default function LoginPage() {
  const router = useRouter()
  const user = useSelector(UserSelector)

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  if (user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Redirecting...</div>
      </div>
    )
  }

  return <Login />
}