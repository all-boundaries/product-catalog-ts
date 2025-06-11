import type { Serve } from "bun";
import { allProducts } from "./product/all-products";

export const serverDefinition: Serve<unknown> = {
  hostname: "localhost",
  routes: {
    "/products/": async () => {
      try {
        const products = await allProducts();
        return Response.json({ data: products });
      } catch (e) {
        return Response.json(
          {
            type: "probs/something-went-wrong",
            title: "We do not know what happened, please try again",
          },
          { status: 503 },
        );
      }
    },
    "/products/:id": async (req) => {
      const products = await allProducts();
      const product = products.find((p) => p.id === req.params.id);

      if (!product) {
        return Response.json(
          {
            type: "probs/not-found",
            title: "Product does not exist",
          },
          { status: 404 },
        );
      }

      return Response.json(product);
    },
  },
};
