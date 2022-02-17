import { Router } from "https://deno.land/x/oak@v10.2.1/mod.ts";
import {
  addProduct,
  getProducts,
  getProductById,
} from "./controllers/products.ts";

const router = new Router();

router
  .get("/api/v1/products", getProducts)
  .get("/api/v1/products/:productId", getProductById)
  .post("/api/v1/products", addProduct);

export default router;