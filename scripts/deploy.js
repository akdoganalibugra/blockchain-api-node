require("dotenv").config();
const Web3 = require("web3");
const fs = require("fs");
const path = require("path");

const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.SEPOLIA_RPC_URL)
);

const account = web3.eth.accounts.privateKeyToAccount(
    process.env.DEPLOYER_PRIVATE_KEY
);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

console.log("Deploying contracts with the account:", account.address);

const tokenContractPath = path.resolve(
    __dirname,
    "../artifacts/contracts/TestToken.sol/TestToken.json"
);
const rewardContractPath = path.resolve(
    __dirname,
    "../artifacts/contracts/Reward.sol/Reward.json"
);

const tokenContractJson = JSON.parse(
    fs.readFileSync(tokenContractPath, "utf8")
);
const rewardContractJson = JSON.parse(
    fs.readFileSync(rewardContractPath, "utf8")
);

const TestToken = new web3.eth.Contract(tokenContractJson.abi);
const Reward = new web3.eth.Contract(rewardContractJson.abi);

const initialSupply = web3.utils.toWei("1000", "ether"); // Bin token

async function deployTestToken() {
    try {
        const token = await TestToken.deploy({
            data: tokenContractJson.bytecode,
            arguments: [initialSupply],
        }).send({
            from: account.address,
            gas: 1500000,
            gasPrice: "30000000000",
        });

        console.log("TestToken deployed to:", token.options.address);
        return token.options.address;
    } catch (error) {
        console.error("TestToken deployment failed:", error);
        process.exit(1);
    }
}

async function deployRewardContract(tokenAddress) {
    try {
        const reward = await Reward.deploy({
            data: rewardContractJson.bytecode,
            arguments: [tokenAddress],
        }).send({
            from: account.address,
            gas: 1500000,
            gasPrice: "30000000000",
        });

        console.log("Reward contract deployed to:", reward.options.address);
    } catch (error) {
        console.error("Reward contract deployment failed:", error);
        process.exit(1);
    }
}

async function main() {
    try {
        const tokenAddress = await deployTestToken();
        await deployRewardContract(tokenAddress);
    } catch (error) {
        console.error("Error in deployment process:", error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error in main:", error);
        process.exit(1);
    });
