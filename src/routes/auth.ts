import { Router } from "../deps.ts";
import { authenticateToken } from "../middlewares/authMiddlewares.ts";
import { login, test, singUp } from "../controllers/auth.ts";

const authRouter = new Router();

authRouter
  // if you want every method in the router to use the authenticateToken middleware
  // .use(authenticateToken)
  .post("/login", login)
  .post("/signup", singUp)
  // if you only want a method to use the authenticateToken middleware
  .get("/test", authenticateToken, test);

export default authRouter;
