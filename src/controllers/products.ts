import { Context, helpers } from "../deps.ts";
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

  if (!product) {
    context.throw(404, `Product with id ${productId} was not found`);
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
  // console.log(await request.body().value);
  const value = await request.body({ type: "json" }).value;
  // console.log(body);
  // const value = await body.value;
  console.log(value);

  if (!request.hasBody || !value) {
    context.throw(400, `Body cannot be empty`);
  }

  const product = value;
  context.response.body = product;
};

export { addProduct, getProductById, getProducts };
