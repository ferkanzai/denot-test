import { Router } from "../deps.ts";
import { authenticateToken } from "../middlewares/authMiddlewares.ts";
import { getAllUsers } from "../controllers/users.ts";
import { isAdmin } from "../middlewares/adminMiddleware.ts";

const usersRouter = new Router();

usersRouter.get("/", authenticateToken, isAdmin, getAllUsers);

export default usersRouter;
