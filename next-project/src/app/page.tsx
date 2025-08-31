'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { UserSelector } from '@/store/global.Selector'
import { GetUserData, GetWebsite } from '@/store/global.Action'
import { setWebsiteQueue } from '@/store/global.Slice'
import Landing from '@/components/pages/Landing'
import toast from 'react-hot-toast'

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(UserSelector)
  const websiteQueue = useSelector((state: any) => state?.global?.websiteQueue)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      localStorage.setItem('authToken', token)
      dispatch(GetUserData(token) as any)
      dispatch(GetWebsite(token) as any)
      router.push('/dashboard')
    }
  }, [dispatch, router])

  useEffect(() => {
    const handleNewWebsite = async () => {
      if (!websiteQueue) return
      
      try {
        const website = websiteQueue
        dispatch(setWebsiteQueue(null))
        
        // Handle different website creation modes
        // Implementation would be similar to your original App.jsx
        
        const token = localStorage.getItem('authToken')
        toast.success("You can access your website redesign in my website tab")
        if (token) {
          dispatch(GetWebsite(token) as any)
          dispatch(GetUserData(token) as any)
        }
      } catch (error) {
        console.log("Error creating new website:", error)
        toast.error('Error creating new website')
      }
    }

    if (user && websiteQueue) {
      handleNewWebsite()
    }
  }, [user, websiteQueue, dispatch])

  return <Landing />
}