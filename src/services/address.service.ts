import Web3 from "web3";
import Web3Connection from "../config/web3Connection";

class AddressService {
    private web3: Web3;
    private static instance: AddressService;

    private constructor() {
        const web3Connection = Web3Connection.getInstance();
        this.web3 = web3Connection.web3;
    }

    public static getInstance(): AddressService {
        if (!AddressService.instance) {
            AddressService.instance = new AddressService();
        }
        return AddressService.instance;
    }

    public generateAddresses(count: number): string[] {
        const addresses: string[] = [];
        for (let i = 0; i < count; i++) {
            const account = this.web3.eth.accounts.create();
            addresses.push(account.address);
        }
        return addresses;
    }
}

export default AddressService;
