const NFMint = artifacts.require("./NFMint.sol");
const Minter = artifacts.require("./Minter.sol");
module.exports = async function (deployer, N, accounts) {
  await deployer.deploy(NFMint, "NFT Mint", "NFMint");
  const nfMint = await NFMint.deployed();

  console.log(nfMint);

  // await deployer.deploy(Minter);

  // // const minter = await Minter.deployed();

  // // const result = await minter.mintNFT("name", "symbol", "uri");
  // // const nftAddress = result.logs[0].args.contractAddress;
  // // const collectible = await minter.getCollectible(0, nftAddress);
};
