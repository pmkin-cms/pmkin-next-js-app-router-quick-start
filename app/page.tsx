import { gql } from '@apollo/client'
import Link from 'next/link'

import { client } from './lib/apollo-client'

const GET_DOCUMENTS = gql`
  query GetDocuments {
    documents(includeDrafts: false) {
      id
      metaDescription
      slug
      title
    }
  }
`

interface Document {
  id: string
  metaDescription: string
  slug: string
  title: string
}

async function getDocuments(): Promise<Document[]> {
  const { data } = await client.query({ query: GET_DOCUMENTS })

  return data.documents
}

export default async function BlogList() {
  const documents = await getDocuments()

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-black text-2xl md:text-3xl">Blog Posts</h1>

      <div className="space-y-8">
        {documents.map((doc) => (
          <article
            key={doc.id}
            className="space-y-1 border-b border-slate-200 pb-8"
          >
            <h2 className="text-black font-medium text-lg hover:underline">
              <Link
                className="text-black"
                href={`/blog/${doc.slug}`}
              >
                {doc.title}
              </Link>
            </h2>

            <p>{doc.metaDescription}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
