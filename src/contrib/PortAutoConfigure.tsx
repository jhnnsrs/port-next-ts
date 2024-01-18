import React, { useEffect } from "react";
import { useFakts } from "@jhnnsrs/fakts";
import { useHerre } from "@jhnnsrs/herre";
import { usePort } from "../port";

export const PortAutoConfigure: React.FC<{}> = (props) => {
  const { configure } = usePort();
  const { token } = useHerre();
  const { fakts } = useFakts();

  useEffect(() => {
    if (token && fakts.port_next) {
      console.log("Configuring kluster client", fakts.port_next)
      configure({
        secure: fakts.port_next.secure,
        wsEndpointUrl: fakts.port_next.ws_endpoint_url,
        endpointUrl: fakts.port_next.endpoint_url,
        retrieveToken: () => token,
      });
    }
  }, [token, fakts]);

  return <> </>;
};
