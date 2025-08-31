'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { UserSelector, websiteSelector } from '@/store/global.Selector'
import { GetUserData, GetWebsite } from '@/store/global.Action'
import { logOutUser } from '@/store/global.Slice'
import Dashboard from '@/components/pages/Dashboard'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(UserSelector)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      router.push('/login')
      return
    }

    dispatch(GetUserData(token) as any)
    
    const interval = setInterval(() => {
      dispatch(GetUserData(token) as any)
    }, 5000)

    return () => clearInterval(interval)
  }, [dispatch, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paymentId = params.get('payment_id')
    const token = localStorage.getItem('authToken')
    
    if (paymentId && token) {
      dispatch(GetUserData(token) as any)
      dispatch(GetWebsite(token) as any)
      router.push('/dashboard')
    }
  }, [dispatch, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return <Dashboard />
}