import { Router } from "../deps.ts";
import { authenticateToken } from "../middlewares/authMiddlewares.ts";
import { getAllUsers } from "../controllers/users.ts";

const usersRouter = new Router();

usersRouter.get("/", authenticateToken, getAllUsers);

export default usersRouter;
