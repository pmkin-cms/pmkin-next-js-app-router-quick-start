import { gql } from '@apollo/client'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

import { client } from '../../lib/apollo-client'

import './blog-post.css'

const GET_DOCUMENT = gql`
  query GetDocument($slug: String!) {
    documentBySlug(slug: $slug) {
      id
      coverImage {
        url
      }
      markdown
      metaDescription
      metaTitle
      publishedAt
      title
    }
  }
`

interface Document {
  id: string
  coverImage?: {
    url: string
  }
  markdown: string
  metaDescription: string
  metaTitle: string
  publishedAt: string
  title: string
}

async function getDocument(slug: string): Promise<Document | undefined> {
  const { data } = await client.query({
    query: GET_DOCUMENT,
    variables: {
      slug: decodeURIComponent(slug)
    }
  })

  return data.documentBySlug ?? undefined
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const document = await getDocument(params.slug)

  if (!document) {
    return {
      title: 'Not found',
      description: 'This blog post could not be found.'
    }
  }

  return {
    title: document.metaTitle ?? document.title,
    description: document.metaDescription
  }
}

export default async function BlogPost({
  params
}: {
  params: { slug: string }
}) {
  const document = await getDocument(params.slug)

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
