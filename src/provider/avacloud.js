import { AvaCloudSDK } from "@avalabs/avacloud-sdk";

const {
  REACT_APP_AVACLOUD_NETWORK: network,
  REACT_APP_AVACLOUD_CHAIN_ID: chainId,
  REACT_APP_AVACLOUD_API_KEY: apiKey
} = process.env;

export const avaCloudSDK = new AvaCloudSDK({
    apiKey,
    chainId,
    network,
});