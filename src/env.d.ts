declare namespace NodeJS {
    export interface ProcessEnv {
        // Project params
        NODE_ENV: "development" | "production";
        PORT?: string;

        // Hardhat params
        SEPOLIA_RPC_URL: string;
        DEPLOYER_PRIVATE_KEY: string;
        ETHERSCAN_API_KEY: string;
    }
}
