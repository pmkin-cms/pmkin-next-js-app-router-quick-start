import { gql } from '@apollo/client'

import { client } from './apollo-client'

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

export async function getDocument(slug: string): Promise<Document | undefined> {
  const { data } = await client.query({
    query: GET_DOCUMENT,
    variables: {
      slug: decodeURIComponent(slug)
    }
  })

  return data.documentBySlug ?? undefined
}
