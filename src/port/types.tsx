import {
  ApolloClient,
  NormalizedCacheObject,
  PossibleTypesMap,
} from "@apollo/client";

export type PortConfig = {
  endpointUrl: string;
  wsEndpointUrl: string;
  secure: boolean;
  retrieveToken: () => string;
  possibleTypes?: PossibleTypesMap;
};

export type PortState = {
  config?: PortConfig;
  client?: PortClient;
};

export type PortContextType = PortState & {
  configure: (config?: PortConfig) => void;
};

export type PortClient = ApolloClient<NormalizedCacheObject>;
