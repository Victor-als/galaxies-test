import { ApolloProvider } from '@apollo/client/react'
import { Home } from './pages/Home'
import { client } from './api/appolloClient.'

function App() {


  return (
    <>
      <ApolloProvider client={client}>
        <Home/>
      </ApolloProvider>
    </>
  )
}

export default App
