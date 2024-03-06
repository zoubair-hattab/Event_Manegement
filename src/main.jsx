import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';

import ThemeProvider from './components/ThemeProvider.jsx';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { Provider } from 'react-redux';
import { Store } from './redux/store.js';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, walletConnectWallet, coinbaseWallet],
    },
  ],
  {
    projectId: 'YOUR_PROJECT_ID',
  }
);

export const config = createConfig({
  chains: [polygonMumbai],
  connectors,
  transports: {
    [polygonMumbai.id]: http(),
  },
});

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider
        coolMode
        modalSize="compact"
        theme={lightTheme({
          accentColor: '#9F5CE7',
          accentColorForeground: 'white',
          borderRadius: 'large',
          fontStack: 'system',
        })}
      >
        <Provider store={Store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
