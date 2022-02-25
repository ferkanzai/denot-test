import { Context } from "../deps.ts";

export const isAdmin = async (
  context: Context,
  next: () => Promise<unknown>
) => {
  const { roles }: { roles?: string[] } = context.state;

  if (!roles || !roles?.includes("admin")) {
    context.throw(401, "Unauthorized - not admin");
  }

  await next();
};
