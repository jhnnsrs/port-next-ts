import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import React, { useState } from "react";
import { createPortClient } from "./client";
import { PortContext } from "./PortContext";
import { PortConfig, PortState } from "./types";

export type PortProps = {
  children: React.ReactNode;
  clientCreator?: (
    config: PortConfig
  ) => ApolloClient<NormalizedCacheObject>;
};

export const PortProvider: React.FC<PortProps> = ({
  children,
  clientCreator = createPortClient,
}) => {
  const [state, setState] = useState<PortState>({
    config: undefined,
    client: undefined,
  });

  const configure = (config?: PortConfig) => {
    if (!config) {
      setState({
        config: undefined,
        client: undefined,
      });
      return;
    }

    setState({ config: config, client: clientCreator(config) });
  };

  return (
    <PortContext.Provider
      value={{
        configure: configure,
        ...state,
      }}
    >
      {children}
    </PortContext.Provider>
  );
};
