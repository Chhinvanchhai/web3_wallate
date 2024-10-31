// Public RPC endpoints (No API keys exposed)
export const SUPPORTED_NETWORKS = {
  mainnet: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: [
      'https://eth.public-rpc.com',
      'https://cloudflare-eth.com'
    ],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  sepolia: {
    chainId: '0xaa36a7',
    chainName: 'Sepolia Testnet',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'SEP', decimals: 18 },
    rpcUrls: [
      'https://rpc.sepolia.org',
      'https://sepolia.gateway.tenderly.co'
    ],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
};