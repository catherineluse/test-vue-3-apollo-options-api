import { createApp, h } from 'vue'
import App from './App.vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'


const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    cache,
    uri: 'http://localhost:8080/graphql',
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})


const app = createApp({
    render: () => h(App),
})

app.use(apolloProvider)
    .mount('#app')



