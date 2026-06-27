import { jwtDecode } from "jwt-decode";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from "@apollo/client";

import handleRefresh from "../helper/refreshToken";

const httpLink = new HttpLink({
  uri: "https://marketplace-backend-vv3p.onrender.com/graphql",
  credentials: "include",
});
let refreshPromise = null;
const authLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    (async () => {
      try {
        console.log("AuthLink running");
        let token = localStorage.getItem("token");

        if (token) {
          const decoded = jwtDecode(token);
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired) {
            console.log("Refreshing token...");
            token = await handleRefresh();
          }
        }
       

        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        }));

        forward(operation).subscribe({
          next: (value) => observer.next(value),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      } catch (err) {
        observer.error(err);
      }
    })();
  });
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
