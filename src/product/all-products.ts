export type Product = {
  id: string;
  name: string;
  description: string;
  status: "active" | "not-active";
  specs: Array<string>;
  tags: Array<string>;
};

export async function allProducts(): Promise<Array<Product>> {
  const source = Bun.file(process.env.PRODUCTS_FILE!);
  const content = await source.json();
  return content;
}
