import dayjs from 'dayjs'
import { Metadata } from 'next'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

import { pmkin } from '@/app/lib/pmkin'

import './blog-post.css'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const document = await pmkin.findDocumentBySlug(
    decodeURIComponent(params.slug)
  )

  if (!document) {
    return {
      title: 'Not found',
      description: 'This blog post could not be found.'
    }
  }

  const title = `${document.metaTitle ?? document.title} | My Travel Blog`
  const description =
    document.metaDescription ?? `Read more about ${document.title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  }
}

export default async function BlogPost({
  params
}: {
  params: { slug: string }
}) {
  const document = await pmkin.findDocumentBySlug(
    decodeURIComponent(params.slug)
  )

  if (!document) {
    return (
      <div className="p-8 space-y-4">
        <div>
          <h1 className="text-gray-900 font-medium text-lg md:text-4xl hover:text-black mb-2">
            Post not found
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-4">
      <div>
        <h1 className="text-gray-900 font-medium text-lg md:text-4xl hover:text-black mb-2">
          {document.title}
        </h1>

        <div className="text-xs text-gray-600 font-semibold">
          {dayjs(document.publishedAt).format('D MMMM, YYYY')}
        </div>
      </div>

      {document.coverImage && (
        <div className="w-full aspect-video">
          <Image
            alt={document.title}
            className="w-full h-full object-cover"
            src={document.coverImage.url}
            width={608}
            height={342}
          />
        </div>
      )}

      <article>
        <ReactMarkdown>{document.markdown}</ReactMarkdown>
      </article>
    </div>
  )
}
