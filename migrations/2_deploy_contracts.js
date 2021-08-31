const NFT = artifacts.require("./NFT.sol");
const Minter = artifacts.require("./Minter.sol");
module.exports = async function (deployer, N, accounts) {
  await deployer.deploy(NFT, "collectable name", "collectible symbol");
  await deployer.deploy(Minter);

  const minter = await Minter.deployed();

  const result = await minter.mintNFT("name", "symbol", "uri");
  const nftAddress = result.logs[0].args.contractAddress;
  const collectible = await minter.getCollectible(0, nftAddress);
};
