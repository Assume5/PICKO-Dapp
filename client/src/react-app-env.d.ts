/// <reference types="react-scripts" />

interface Window {
  ethereum: any;
}

interface ImportMetaEnv {
  VITE_SERVER_URL: string;
  VITE_ETHERSCAN_API: string;
}
