import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import StravaLogin from './screens/StravaLogin/StravaLogin';
import Login from './screens/Login/Login';

import { configureChains, createClient, defaultChains, WagmiConfig } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const alchemyId = process.env.ALCHEMY_ID;

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    /*new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),*/
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function App() {
  return (
    <React.StrictMode>
      <WagmiConfig client={client}>
        <Routes>
          <Route path="/oauth" element={<StravaLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="about" element={<About />} />
              <Route path="features" element={<Dashboard />} />
              <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </WagmiConfig>
    </React.StrictMode>
  );
}

export default App;
