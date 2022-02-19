import { Router } from "../deps.ts";
import { authenticateToken } from "../middlewares/authMiddlewares.ts";
import { signIn, test, singUp } from "../controllers/auth.ts";

const authRouter = new Router();

authRouter
  // if you want every method in the router to use the authenticateToken middleware
  // .use(authenticateToken)
  .post("/signin", signIn)
  .post("/signup", singUp)
  // if you only want a method to use the authenticateToken middleware
  .get("/test", authenticateToken, test);

export default authRouter;
