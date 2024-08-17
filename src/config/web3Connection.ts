import Web3 from "web3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

class Web3Connection {
    public web3!: Web3;
    public tokenContract: any;
    public rewardContract: any;
    private static instance: Web3Connection;

    private constructor() {
        this.initializeWeb3();
        this.initializeContracts();
    }

    private initializeWeb3() {
        const rpcUrl = process.env.SEPOLIA_RPC_URL;
        this.web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
    }

    private initializeContracts() {
        const tokenAddress = process.env.TOKEN_CONTRACT_ADDRESS;
        const rewardAddress = process.env.REWARD_CONTRACT_ADDRESS;

        const tokenAbiPath = path.resolve(
            __dirname,
            "../artifacts/contracts/TestToken.sol/TestToken.json"
        );
        const rewardAbiPath = path.resolve(
            __dirname,
            "../artifacts/contracts/Reward.sol/Reward.json"
        );

        const tokenAbi = JSON.parse(fs.readFileSync(tokenAbiPath, "utf8")).abi;
        const rewardAbi = JSON.parse(
            fs.readFileSync(rewardAbiPath, "utf8")
        ).abi;

        this.tokenContract = new this.web3.eth.Contract(tokenAbi, tokenAddress);
        this.rewardContract = new this.web3.eth.Contract(
            rewardAbi,
            rewardAddress
        );
    }

    public static getInstance(): Web3Connection {
        if (!Web3Connection.instance) {
            Web3Connection.instance = new Web3Connection();
        }
        return Web3Connection.instance;
    }
}

export default Web3Connection;
