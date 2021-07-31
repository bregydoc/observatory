import { devtoolsExchange } from "@urql/devtools";
import {
  cacheExchange,
  CombinedError,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  subscriptionExchange,
} from "urql";
// import { Client, createClient as createWSClient } from "graphql-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
// const BASE_URL = "localhost:8080/graphql";

// let wsClient: Client | null = null;

let basicExchanges = [devtoolsExchange, fetchExchange];
// errorExchange({
//   onError: (error: CombinedError) => {
//     console.log({ error });
//   },
// }),

export const URQLClient = () => {
  if (process.browser) {
    const subscriptionClient = new SubscriptionClient("ws://localhost:8080/graphql", {
      reconnect: true,
      timeout: 20000,
    });

    basicExchanges = [
      ...basicExchanges,
      subscriptionExchange({
        forwardSubscription: operation => subscriptionClient.request(operation),
      }),
    ];
  }

  return createClient({
    url: `http://localhost:8080/graphql`,
    exchanges: basicExchanges,
  });
};
