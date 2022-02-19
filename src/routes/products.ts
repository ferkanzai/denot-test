import { Router } from "../deps.ts";
import {
  addProduct,
  getProductById,
  getProducts,
} from "../controllers/products.ts";

const productsRouter = new Router();

productsRouter
  .get("/", getProducts)
  .get("/:productId", getProductById)
  .post("/", addProduct);

export default productsRouter;
