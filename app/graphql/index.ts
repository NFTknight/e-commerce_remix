import { createClient } from "urql";

const client = createClient({
  url: "https://api.dev.anyaa.io/graphql",
  fetchOptions: () => {
    const token = localStorage.getItem("token");
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export default client;
