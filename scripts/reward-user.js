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

console.log("Testing contracts with the account:", account.address);

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

const targetAddress = "0x377747F005f56C2F258A1c83AF8a384d47040Bad"; // Hedef adres

async function testRewardContract(rewardContractAddress, tokenContractAddress) {
    try {
        const reward = new web3.eth.Contract(
            rewardContractJson.abi,
            rewardContractAddress
        );
        const token = new web3.eth.Contract(
            tokenContractJson.abi,
            tokenContractAddress
        );

        // Mint some tokens to the deployer's account to distribute
        // await token.methods
        //     .mint(account.address, web3.utils.toWei("1000", "ether"))
        //     .send({ from: account.address });

        // Test rewardUsers function with the target address only
        await reward.methods
            .rewardUsers([targetAddress], web3.utils.toWei("1000", "ether"))
            .send({ from: account.address, gasLimit: 300000 });

        // Check token balance of the target address
        const balance = await token.methods.balanceOf(targetAddress).call();
        console.log(
            `Target address ${targetAddress} balance: ${web3.utils.fromWei(
                balance,
                "ether"
            )} tokens`
        );

        // Check the winners list
        const winners = await reward.methods.getWinners().call();
        console.log("Winners list:", winners);
    } catch (error) {
        console.error("Error in testing Reward contract:", error);
        process.exit(1);
    }
}

async function main() {
    const rewardContractAddress = "0xe57b9cb3eE32820a3727e5895a2BBD3c785eC3E7"; // Mevcut Reward kontrat adresi
    const tokenContractAddress = "0xea7c272b50BA959BbDb225B97D6717Ead94fa64d"; // Mevcut Token kontrat adresi

    await testRewardContract(rewardContractAddress, tokenContractAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error in main:", error);
        process.exit(1);
    });
