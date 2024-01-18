import { useState } from "react";
import "./App.css";
import {
  FaktsProvider,
  FaktsGuard,
  useFakts,
  WellKnownDiscovery,
} from "@jhnnsrs/fakts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Callback } from "./contrib/Callback";
import { NoHerre } from "./NoHerre";
import { HerreGuard, HerreProvider, useHerre } from "@jhnnsrs/herre";
import { PortGuard, PortProvider, withPort } from "./port";
import { PortAutoConfigure } from "./contrib/PortAutoConfigure";
import { NoPort } from "./NoPort";
import { FaktsLogin } from "./contrib/FaktsLogin";
import {  useListClusterQuery } from "./port/api/graphql";

export const Log = () => {
  const fakts = useFakts();
  const herre = useHerre();

  return (
    <>
      <button
        onClick={() => {
          herre.logout();
          fakts.setFakts(null);
        }}
      >
        ssss
      </button>
      <pre style={{ maxWidth: "200px" }}>
        {fakts && JSON.stringify(fakts, null, 2)}
      </pre>
    </>
  );
};


export const Clusters = () => {
  const { data, error } = withPort(useListClusterQuery)({

  });

  return (
    <>
      hello
      {error && <div>{error.message}</div>}
      {data?.daskClusters.map((cluster) => (
        <div key={cluster.name}>{cluster.name}</div>
      ))}
      
    </>
  );
};




export const ProtectedApp = () => {
  return (
    <HerreGuard fallback={<NoHerre />}>
      <PortProvider>
        <Log />
        <PortAutoConfigure />
        <PortGuard fallback={<NoPort />}>
          <Clusters />

        </PortGuard>
      </PortProvider>
    </HerreGuard>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FaktsProvider>
        <WellKnownDiscovery endpoints={["http://localhost:8000"]} />
        <FaktsGuard fallback={<FaktsLogin />}>
          <HerreProvider>
            <Router>
              <Routes>
                <Route path="/" element={<ProtectedApp />} />
                <Route path="/callback" element={<Callback />} />
              </Routes>
            </Router>
          </HerreProvider>
        </FaktsGuard>
      </FaktsProvider>
    </div>
  );
}

export default App;
