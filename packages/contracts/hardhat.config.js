require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.POLYGONSCAN_API_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  //defaultNetwork: "matic_testnet",
  // networks: {
  //     matic_testnet: {
  //         url: "https://rpc-mumbai.maticvigil.com",
  //         accounts: [PRIVATE_KEY],
  //         gasPrice: 8000000000
  //     },
  //     matic: {
  //         url: "https://polygon-mainnet.infura.io/v3/91c1c91bb0b0441aaa848ededdb9cee1",
  //         accounts: [PRIVATE_KEY],
  //         gasPrice: 8000000000
  //     },
  // },
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
