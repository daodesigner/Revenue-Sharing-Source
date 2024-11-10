import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@openzeppelin/hardhat-upgrades";
dotenv.config();

// You should replace these values with your own node URL and private keys

const SEPOLIA_RPC_URL = process.env.RPC_URL;
const OP_RPC_URL = process.env.PROD_RPC_URL;

const accounts = process.env.PRIVATE_KEYS?.split(',');
const prod_accounts = process.env.PROD_PRIVATE_KEYS?.split(',')

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
    },
  },
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts,
      chainId: 11155420, // OP Sepolia chain ID
      gasPrice: "auto",
    },

    optimism: {
      url: OP_RPC_URL,
      accounts: prod_accounts,
      chainId: 10, // OP mainnet
      gasPrice: "auto",
    }
  },

  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    rst: true,
    enabled: true,
    coinmarketcap: "603bd12e-d2f3-4a9f-8c82-d5e346d9d482",
  },

};


export default config;
