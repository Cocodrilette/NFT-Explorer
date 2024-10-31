import { isAddress, JsonRpcProvider, Contract } from "ethers";

import { avaCloudSDK } from "../provider/avacloud";
import { DEFAULT_IMAGE, ERC721_ABI, RPC_URL } from "../constants";

export const fetchNFTs = async (
  owner,
  contractAddress,
  setNFTs,
  retryAttempt
) => {
  if (retryAttempt === 5) return;

  if (owner) {
    let options;
    let data = [];

    try {
      if (isAddress(contractAddress)) {
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

      for (let i = 0; i < result.erc721TokenBalances.length; i++) {
        const tokenBalance = result.erc721TokenBalances[i];
        const tokenUri = await fetchTokenUri(tokenBalance.address, tokenBalance.tokenId);

        data.push({
          media: [{ gateway: tokenUri }],
          id: { tokenId: tokenBalance.tokenId },
          title: tokenBalance.name,
          contract: { address: tokenBalance.address },
        });
      }

      setNFTs(data);
    } catch (e) {
      console.error(e);
      fetchNFTs(owner, contractAddress, setNFTs, retryAttempt + 1);
    }
  }
};

const fetchTokenUri = async (contractAddress, tokenId) => {
  const provider = new JsonRpcProvider(RPC_URL);
  const contract = new Contract(contractAddress, ERC721_ABI, provider);

  try {
    return await contract.tokenURI(tokenId);
  } catch (error) {
    return DEFAULT_IMAGE;
  }
};
