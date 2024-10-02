import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://content.pmkin.io/graphql'
})

const authLink = setContext((_, { headers }) => {
  const pmkinApiKey = process.env.PMKIN_API_KEY

  if (!pmkinApiKey) {
    throw new Error('PMKIN_API_KEY is not set.')
  }

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${pmkinApiKey}`
    }
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})
