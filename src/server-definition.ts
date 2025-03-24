import type { Serve } from "bun";

const allProducts = [
  {
    id: "prd-2nuSChH",
    name: "Product 1",
    description: "Description 1",
    status: "active",
    specs: [],
    tags: [],
  },
  {
    id: "prd-CoPPX-5",
    name: "Product 2",
    description: "Description 2",
    status: "active",
    specs: [],
    tags: [],
  },
  {
    id: "prd-RQBQcvr",
    name: "Product 3",
    description: "Description 3",
    status: "active",
    specs: [],
    tags: [],
  },
  {
    id: "prd-pIZvird",
    name: "Product 4",
    description: "Description 4",
    status: "active",
    specs: [],
    tags: [],
  },
  {
    id: "prd-IIkZDUO",
    name: "Product 5",
    description: "Description 5",
    status: "active",
    specs: [],
    tags: [],
  },
  {
    id: "prd-8ciKO_u",
    name: "Product 6",
    description: "Description 6",
    status: "active",
    specs: [],
    tags: [],
  },
];

export const serverDefinition: Serve<unknown> = Bun.serve({
  hostname: "localhost",
  routes: {
    "/products": () => Response.json({ data: allProducts }),
    "/products/:id": (req) => {
      const product = allProducts.find((p) => p.id === req.params.id);

      if (!product) {
        return Response.json(
          { errors: [{ msg: "Product not found" }] },
          { status: 404 },
        );
      }

      return Response.json(product);
    },
  },
});
