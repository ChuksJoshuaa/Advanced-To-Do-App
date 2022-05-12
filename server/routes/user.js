import express from "express";

const router = express();

import { login, register } from "../controllers/user.js";

router.post("/login", login);
router.post("/register", register);

export default router;
