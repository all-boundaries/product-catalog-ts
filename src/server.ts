import { serverDefinition } from "./server-definition";

process.env.PRODUCTS_FILE = "src/product/product-db.json";

const server = Bun.serve(serverDefinition);

console.log(`Listening on http://localhost:${server.port}`);
