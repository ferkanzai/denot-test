import { Context, helpers } from "https://deno.land/x/oak/mod.ts";
import { Product } from "../types.ts";

const products: Product[] = [
  {
    id: "1",
    name: "Product One",
    description: "This is product one",
    price: 29.99,
  },
  {
    id: "2",
    name: "Product Two",
    description: "This is product two",
    price: 39.99,
  },
  {
    id: "3",
    name: "Product Three",
    description: "This is product three",
    price: 59.99,
  },
];

// @desc    Get all products
// @route   GET /api/v1/products

const getProducts = ({ response }: Context) => {
  console.log(Deno.env.get("TEST"));

  response.body = {
    success: true,
    data: products,
  };
};

// @desc    Get a single product
// @route   GET /api/v1/products/:id

const getProductById = (context: Context) => {
  const { response } = context;
  const { productId } = helpers.getQuery(context, { mergeParams: true });

  const product: Product | undefined = products.filter(
    ({ id }) => id === productId
  )[0];

  const error = {
    success: false,
    message: `Product with id ${productId} not found`,
  };

  if (!product) {
    context.throw(404, JSON.stringify(error, null, 2));
  }

  response.body = {
    success: true,
    data: product,
  };
};

// @desc    Add product
// @route   POST /api/v1/products

const addProduct = async (context: Context) => {
  const { request } = context;
  const body = request.body();

  const error = {
    success: false,
    message: `Body cannot be empty`,
  };

  if (!request.hasBody) {
    context.throw(404, JSON.stringify(error, null, 2));
  }

  const product = JSON.parse(await body.value) as Product;
  console.log(product);
};

export { addProduct, getProducts, getProductById };
