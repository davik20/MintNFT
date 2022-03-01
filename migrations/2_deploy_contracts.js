const NFMint = artifacts.require("./NFMint.sol");
const Minter = artifacts.require("./Minter.sol");
module.exports = async function (deployer, N, accounts) {
  await deployer.deploy(NFMint, "NFT Mint", "NFMint");
  const nfMint = await NFMint.deployed();

  console.log(nfMint);

  // // await deployer.deploy(Minter);

  // const result = await nfMint.addCollectible("uri", accounts[0]);

  // const collectibles = await nfMint.getAllUserCollectibles(accounts[0]);
  // console.log(collectibles);
};
