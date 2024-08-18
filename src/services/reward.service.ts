import Web3Connection from "../config/web3Connection";
import AddressService from "./address.service";

class RewardService {
    private tokenContract: any;
    private rewardContract: any;
    private addressService: AddressService;
    private static instance: RewardService;
    private static readonly TOKEN_AMOUNT = 1000;

    private constructor() {
        const web3Connection = Web3Connection.getInstance();
        this.tokenContract = web3Connection.tokenContract;
        this.rewardContract = web3Connection.rewardContract;
        this.addressService = AddressService.getInstance();
    }

    public static getInstance(): RewardService {
        if (!RewardService.instance) {
            RewardService.instance = new RewardService();
        }
        return RewardService.instance;
    }

    public async rewardUsersWithGeneratedAddresses() {
        const users = this.addressService.generateAddresses(10);
        return await this.rewardContract.methods
            .rewardUsers(users, RewardService.TOKEN_AMOUNT)
            .send();
    }

    public async getWinners() {
        return await this.rewardContract.methods.getWinners().call();
    }
}

export default RewardService;
