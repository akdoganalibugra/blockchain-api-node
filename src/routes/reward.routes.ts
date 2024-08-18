import express, { Router } from "express";
import RewardController from "../controllers/rewardController";

const { rewardUsers, getWinners } = RewardController;

const router: Router = express.Router();

router.post("/reward-users", rewardUsers);

router.get("/winners", getWinners);

export default router;
