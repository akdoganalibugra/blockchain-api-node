import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import healthCheckRouter from "./routes/health-check.routes";
import rewardRouter from "./routes/reward.routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// enable cors
app.use(cors());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", healthCheckRouter);
app.use("/api/rewards", rewardRouter);

app.listen(PORT, () => {
    console.log(`[server]: Server is running at ${PORT}`);
});
