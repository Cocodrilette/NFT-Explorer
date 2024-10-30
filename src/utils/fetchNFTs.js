import { JsonRpcProvider, Contract } from "ethers";
import { AvaCloudSDK } from "@avalabs/avacloud-sdk";

import { ERC721_ABI } from "../constants";

const {
  REACT_APP_AVACLOUD_API_KEY: apiKey,
  REACT_APP_AVACLOUD_CHAIN_ID: chainId,
  REACT_APP_AVACLOUD_NETWORK: network,
  REACT_APP_RPC_URL: rpcUrl,
} = process.env;

const avaCloudSDK = new AvaCloudSDK({
  apiKey,
  chainId,
  network,
});

export const fetchNFTs = async (
  owner,
  contractAddress,
  setNFTs,
  retryAttempt
) => {
  if (retryAttempt === 5) {
    return;
  }
  if (owner) {
    let options;
    let data = [];

    try {
      if (contractAddress) {
        options = {
          pageSize: 10,
          address: owner,
          contractAddress: contractAddress,
        };
      } else {
        options = {
          pageSize: 10,
          address: owner,
        };
      }

      const { result } = await avaCloudSDK.data.evm.balances.listErc721Balances(
        options
      );

      console.log(result);

      for await (const item of result.erc721TokenBalances) {
        const tokenUri = await fetchTokenUri(item.address, item.tokenId);
        console.log(tokenUri);

        data.push({
          media: [
            {
              gateway: tokenUri,
            },
          ],
          id: {
            tokenId: item.tokenId,
          },
          title: item.name,
          contract: {
            address: item.address,
          },
          description: item.name,
        });
      }
    } catch (e) {
      console.error(e);
      fetchNFTs(owner, contractAddress, setNFTs, retryAttempt + 1);
    }

    data.length > 0 && setNFTs(data);
  }
};

const fetchTokenUri = async (contractAddress, tokenId) => {
  const provider = new JsonRpcProvider(rpcUrl);
  const contract = new Contract(contractAddress, ERC721_ABI, provider);

  return await contract.tokenURI(tokenId);
};
