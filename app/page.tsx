import { gql } from '@apollo/client'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { client } from './lib/apollo-client'

const GET_DOCUMENTS = gql`
  query GetDocuments {
    documents(includeDrafts: false) {
      id
      coverImage {
        url
      }
      metaDescription
      publishedAt
      slug
      title
    }
  }
`

interface Document {
  id: string
  coverImage?: {
    url: string
  }
  metaDescription: string
  publishedAt: string
  slug: string
  title: string
}

async function getDocuments(): Promise<Document[]> {
  const { data } = await client.query({ query: GET_DOCUMENTS })

  return data.documents
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'My Travel Blog'
  const description = `Read the latest blog posts from My Travel Blog.`

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

export default async function BlogList() {
  const documents = await getDocuments()

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl md:text-4xl text-black font-poppins font-bold mb-8">
        Blog posts
      </h1>

      <div className="space-y-12">
        {documents.map((doc) => (
          <article
            key={doc.id}
            className="space-y-2"
          >
            {doc.coverImage && (
              <div className="w-full aspect-video">
                <Image
                  alt={doc.title}
                  className="w-full h-full object-cover "
                  src={doc.coverImage.url}
                  width={500}
                  height={280}
                />
              </div>
            )}

            <div className="max-w-lg">
              <Link
                className="text-gray-900 font-medium text-lg md:text-2xl hover:text-black"
                href={`/blog/${doc.slug}`}
              >
                {doc.title}
              </Link>
            </div>

            {doc.metaDescription && (
              <div className="text-gray-700 text-sm leading-6 max-w-2xl">
                {doc.metaDescription}
              </div>
            )}

            <div className="text-xs text-gray-600 font-semibold">
              {dayjs(doc.publishedAt).format('D MMMM, YYYY')}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
