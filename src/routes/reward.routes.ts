import express, { Router } from "express";
import RewardController from "../controllers/rewardController";

const { rewardTargetAddress, getWinners } = RewardController;

const router: Router = express.Router();

router.post("/reward-users", rewardTargetAddress);

router.get("/winners", getWinners);

export default router;
