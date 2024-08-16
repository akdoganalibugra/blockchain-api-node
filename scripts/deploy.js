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

const contractPath = path.resolve(
    __dirname,
    "../artifacts/contracts/TestToken.sol/TestToken.json"
);
const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const TestToken = new web3.eth.Contract(contractJson.abi);

const initialSupply = web3.utils.toWei("1000000", "ether"); // 1 milyon token

async function main() {
    try {
        const token = await TestToken.deploy({
            data: contractJson.bytecode,
            arguments: [initialSupply],
        }).send({
            from: account.address,
            gas: 1500000,
            gasPrice: "30000000000",
        });

        console.log("TestToken deployed to:", token.options.address);
    } catch (error) {
        console.error("Deployment failed:", error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error in main:", error);
        process.exit(1);
    });
