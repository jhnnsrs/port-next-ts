import { PortClient, PortConfig, PortContextType } from "./types";
import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

export const PortContext = React.createContext<PortContextType>({
  configure: () => {
    throw Error("No Provider in context not configured");
  },
});

export const usePort = () => useContext(PortContext);

export const usePortQuery = (query: any) => {
  const { client } = usePort();
  return useQuery(query, { client: client });
};

export function withPort<T extends (options: any) => any>(func: T): T {
  const Wrapped = (nana: any) => {
    const { client } = usePort();
    console.log("withPort", client);
    return func({ ...nana, client: client });
  };
  return Wrapped as T;
}
