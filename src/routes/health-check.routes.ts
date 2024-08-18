import express, { Request, Response, Router } from "express";
import { createResponseObject } from "../utils/api.response.utils";

const router: Router = express.Router();

router.get("/health-check", (req: Request, res: Response) => {
    const response = createResponseObject();
    response.result = "Server is up and running";
    res.status(200).send(response);
});

export default router;
