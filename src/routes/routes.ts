import { Router } from "../deps.ts";
import productsRouter from "./products.ts";
import authRouter from "./auth.ts";
import usersRouter from "./users.ts";

const router = new Router({ prefix: "/v1" });

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
router.use("/users", usersRouter.routes(), usersRouter.allowedMethods());
router.use(
  "/products",
  productsRouter.routes(),
  productsRouter.allowedMethods()
);

export default router;
