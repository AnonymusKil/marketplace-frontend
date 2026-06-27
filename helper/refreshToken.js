import { client } from "@/lib/client";
import { refreshToken } from "../src/graphql/mutations/auth";

const handleRefresh = async () => {
  try {
    const response = await fetch(
      "https://marketplace-backend-vv3p.onrender.com/graphql",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
        mutation {
          refreshToken {
            token
          }
        }
      `,
        }),
      },
    );

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const newToken = result.data.refreshToken.token;

    localStorage.setItem("token", newToken);

    return newToken;
  } catch (err) {
    console.log("Refresh failed → user logged out");
  }
};
export default handleRefresh;
