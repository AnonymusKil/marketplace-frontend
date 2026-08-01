import { io } from "socket.io-client";

export const socket = io(
  "https://marketplace-backend-vv3p.onrender.com/graphql",
  {
    autoConnect: false,
  },
);
