import Web3Connection from "../config/web3Connection";

class RewardService {
    private tokenContract: any;
    private rewardContract: any;
    private static instance: RewardService;
    private static readonly TOKEN_AMOUNT = 1000;
    private account: any;
    private web3: any;
    private targetAddress: string =
        "0x377747F005f56C2F258A1c83AF8a384d47040Bad";

    private constructor() {
        const web3Connection = Web3Connection.getInstance();
        this.tokenContract = web3Connection.tokenContract;
        this.rewardContract = web3Connection.rewardContract;
        this.account = web3Connection.account;
        this.web3 = web3Connection.web3;
    }

    public static getInstance(): RewardService {
        if (!RewardService.instance) {
            RewardService.instance = new RewardService();
        }
        return RewardService.instance;
    }

    public async rewardTargetAddress() {
        try {
            console.log(
                `Sending ${RewardService.TOKEN_AMOUNT} tokens to ${this.targetAddress}`
            );

            const amountInWei = this.web3.utils.toWei(
                RewardService.TOKEN_AMOUNT.toString(),
                "ether"
            );

            const transaction = await this.rewardContract.methods
                .rewardUsers([this.targetAddress], amountInWei)
                .send({
                    from: this.account.address,
                    gasLimit: 300000,
                });

            console.log("Tokens sent successfully!");

            const balanceInWei = await this.tokenContract.methods
                .balanceOf(this.targetAddress)
                .call();
            const balance = this.web3.utils.fromWei(balanceInWei, "ether");
            console.log(
                `Target address ${this.targetAddress} balance: ${balance} tokens (${balanceInWei} Wei)`
            );

            const result = {
                address: this.targetAddress,
                balance: balance,
                transactionHash: transaction.transactionHash,
            };

            return result;
        } catch (error) {
            console.error("Error sending tokens to target address:", error);
            throw error;
        }
    }

    public async getWinners() {
        try {
            const winners = await this.rewardContract.methods
                .getWinners()
                .call();
            console.log("Winners list:", winners);
            return winners;
        } catch (error) {
            console.error("Error retrieving winners list:", error);
            throw error;
        }
    }
}

export default RewardService;
