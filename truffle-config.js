const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          "d86b3c8afcc8b22e7caf2ceecec33da48f6384ebe8bc29c1afdec1a7d412dde3",
          `https://rinkeby.infura.io/v3/3ee5b26be9d9451b96c018232c629555`
        ),
      network_id: 4, // Ropsten's id
      gas: 8000000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: {
      version: ">=0.6.0",
    },
  },
};
