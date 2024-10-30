export const fetchNFTs = async (
  owner,
  contractAddress,
  setNFTs,
  retryAttempt
) => {
  if (retryAttempt === 5) return;

  if (owner) {
    try {
      // Write your code here
    } catch (e) {
      console.error(e);
      fetchNFTs(owner, contractAddress, setNFTs, retryAttempt + 1);
    }
  }
};
