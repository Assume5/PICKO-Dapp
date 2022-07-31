export const serverUrl: string =
  process.env.NODE_ENV === 'production' ? '' : import.meta.env.VITE_SERVER_URL || 'http://localhost:8000';
export const etherscanAPI: string | null = import.meta.env.VITE_ETHERSCAN_API || null;
export const hashKey = 'fiojhasdsadusdenguiosgherayhtdrfhiusdgunzguiondzfiopbm';
