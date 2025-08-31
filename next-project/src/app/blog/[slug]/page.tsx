'use client'

import { useParams } from 'next/navigation'
import BlogPost from '@/components/BlogPost'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  return <BlogPost slug={slug} />
}