import { gql } from '@apollo/client'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'

import { client } from '../../lib/apollo-client'

import './blog-post.css'

const GET_DOCUMENT = gql`
  query GetDocument($slug: String!) {
    documentBySlug(slug: $slug) {
      id
      markdown
      metaDescription
      metaTitle
      title
    }
  }
`

interface Document {
  id: string
  markdown: string
  metaDescription: string
  metaTitle: string
  title: string
}

async function getDocument(slug: string): Promise<Document> {
  const { data } = await client.query({
    query: GET_DOCUMENT,
    variables: { slug }
  })

  return data.documentBySlug
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const document = await getDocument(params.slug)

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

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-black text-2xl md:text-3xl">{document.title}</h1>

      <article>
        <ReactMarkdown>{document.markdown}</ReactMarkdown>
      </article>
    </div>
  )
}
