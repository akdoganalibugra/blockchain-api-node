import { Request, Response } from "express";
import RewardService from "../services/reward.service";
import { createResponseObject } from "../utils/api.response.utils";

class RewardController {
    private rewardService: RewardService;

    constructor() {
        this.rewardService = RewardService.getInstance();
    }

    public rewardUsers = async (req: Request, res: Response) => {
        try {
            const response = createResponseObject();
            response.result =
                await this.rewardService.rewardUsersWithGeneratedAddresses();
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    public getWinners = async (req: Request, res: Response) => {
        try {
            const response = createResponseObject();
            response.result = await this.rewardService.getWinners();
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    };
}

export default new RewardController();
