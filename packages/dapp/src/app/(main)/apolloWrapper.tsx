'use client';

import { HttpLink, from } from '@apollo/client';
import {
   ApolloNextAppProvider,
   InMemoryCache,
   ApolloClient,
} from '@apollo/experimental-nextjs-app-support';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
   if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
         console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
         );
      });
   }

   if (networkError) {
      console.error(`[Network error]: ${networkError}`);
   }

   return forward(operation);
});

function makeClient() {
   const httpLink = new HttpLink({
      uri: 'https://api.studio.thegraph.com/query/76738/summitshare-prod/0.2',
   });

   const cache = new InMemoryCache({
      typePolicies: {
         Query: {
            fields: {
               exhibit: {
                  keyArgs: ['id'],
                  // Maximize cache usage for exhibit queries
                  read(existing, { toReference, args }) {
                     if (existing) return existing;
                     // If we have the exhibit in cache by ID, return it
                     return toReference({
                        __typename: 'Exhibit',
                        id: args?.id,
                     });
                  },
               },
            },
         },
         Exhibit: {
            // Configure exhibit fields for optimal caching
            fields: {
               totalMinted: {
                  read(existing) {
                     return existing || "0";
                  },
               },
               exhibitDetails: {
                  merge(existing, incoming) {
                     // Keep existing data if available, update only if new data
                     return incoming || existing;
                  },
               },
            },
         },
      },
   });

   return new ApolloClient({
      cache,
      link: from([errorLink, httpLink]),
      defaultOptions: {
         watchQuery: {
            // Prioritize cache for exhibit queries
            fetchPolicy: 'cache-first',
            // Only fetch from network if cache miss
            nextFetchPolicy: 'cache-only',
         },
         query: {
            fetchPolicy: 'cache-first',
            errorPolicy: 'all',
         },
      },
   });
}

export function ApolloWrapper({ children }: React.PropsWithChildren<{}>) {
   return (
      <ApolloNextAppProvider makeClient={makeClient}>
         {children}
      </ApolloNextAppProvider>
   );
}