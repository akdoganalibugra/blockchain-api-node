const Web3 = require("web3");
const { expect } = require("chai");
const { artifacts, network } = require("hardhat");

describe("TestToken and Reward Contract with Web3.js", function () {
    let web3, accounts, testToken, reward;
    let owner;
    let testAddresses;

    before(async function () {
        web3 = new Web3(network.provider);

        // Test cüzdanları alın
        accounts = await web3.eth.getAccounts();
        owner = accounts[0];
        testAddresses = accounts.slice(1, 11); // İlk 10 adres (0. index hariç)

        // TestToken kontratını deploy et
        const TestToken = await artifacts.readArtifact("TestToken");
        const TestTokenContract = new web3.eth.Contract(TestToken.abi);
        testToken = await TestTokenContract.deploy({
            data: TestToken.bytecode,
            arguments: [web3.utils.toWei("1000000", "ether")],
        }).send({ from: owner, gas: 1500000 });

        // Reward kontratını deploy et
        const Reward = await artifacts.readArtifact("Reward");
        const RewardContract = new web3.eth.Contract(Reward.abi);
        reward = await RewardContract.deploy({
            data: Reward.bytecode,
            arguments: [testToken.options.address],
        }).send({ from: owner, gas: 1500000 });
    });

    it("Should handle no winners correctly", async function () {
        // Kazananların listesini kontrol et
        const winners = await reward.methods.getWinners().call();
        expect(winners.length).to.equal(0);
    });

    it("Should distribute tokens to 10 reward winners using Web3.js", async function () {
        const amount = web3.utils.toWei("1000", "ether");

        // Her adrese token gönder
        await Promise.all(
            testAddresses.map((address) =>
                reward.methods
                    .rewardUsers([address], amount)
                    .send({ from: owner })
            )
        );

        // Her adresin token bakiyesini kontrol et
        const balances = await Promise.all(
            testAddresses.map((address) =>
                testToken.methods.balanceOf(address).call()
            )
        );
        balances.forEach((balance) => expect(balance).to.equal(amount));

        // Kazananların listesini kontrol et
        const winners = await reward.methods.getWinners().call();
        testAddresses.forEach((address) => expect(winners).to.include(address));
        expect(winners.length).to.equal(testAddresses.length);
    });

    it("Should not reward the same address twice", async function () {
        const amount = web3.utils.toWei("1000", "ether");

        // Aynı adrese ikinci kez token gönderme girişimi
        // İkinci gönderme işleminin başarısız olması beklenir
        try {
            await reward.methods
                .rewardUsers([testAddresses[0]], amount)
                .send({ from: owner });
            throw new Error("Second reward should have failed but it didn't");
        } catch (error) {
            expect(error.message).to.include("User has already won");
        }

        // Adresin token bakiyesini kontrol et
        const balance = await testToken.methods
            .balanceOf(testAddresses[0])
            .call();
        expect(balance).to.equal(web3.utils.toWei("1000", "ether"));

        // Kazananların listesini kontrol et
        const winners = await reward.methods.getWinners().call();
        expect(
            winners.filter((address) => address === testAddresses[0]).length
        ).to.equal(1);
    });
});
