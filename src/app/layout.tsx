'use client'

import './globals.css'
import { ReactNode } from 'react'
import { WagmiConfig, createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 🧠 Set up QueryClient for React Query
const queryClient = new QueryClient()

// 🔌 Set up chains and connectors
const { connectors } = getDefaultWallets({
  appName: 'Deng Shop',
  projectId: 'deng-shop-connect',
})

// ✅ Vercel-safe config: NO autoConnect inside createConfig
const config = createConfig({
  connectors,
  publicClient: http(),
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig config={config}>
            <RainbowKitProvider chains={[mainnet]}>
              {children}
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </body>
    </html>
  )
}
