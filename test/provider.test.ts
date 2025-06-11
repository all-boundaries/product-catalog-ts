import { afterAll, beforeAll, describe, test } from "bun:test";
import { Verifier, type VerifierOptions } from "@pact-foundation/pact";
import { resolve } from "node:path";
import os from "node:os";
import type { Server } from "bun";
import { serverDefinition } from "../src/server-definition";

const pactsToVerify: VerifierOptions =
  process.env.CI === "true"
    ? {
        pactBrokerUrl: "http://pact-broker:9292",
        publishVerificationResult: true,
        providerVersion: process.env.GITHUB_SHA,
        providerVersionBranch: "main",
        consumerVersionSelectors: [{ branch: "main" }],
      }
    : {
        pactUrls: [
          resolve(
            process.cwd(),
            "../subscription/pacts/subscription-product-catalog.json",
          ),
        ],
        publishVerificationResult: false,
        providerVersion: `${os.hostname()}-snapshot`,
      };

describe("contracts", () => {
  let server: Server;

  beforeAll(() => {
    server = Bun.serve(serverDefinition);
  });

  afterAll(() => {
    server.stop();
  });

  test("verify all", async () => {
    await new Verifier({
      logLevel: "info",
      ...pactsToVerify,
      providerBaseUrl: `http://${server.hostname}:${server.port}`,
      provider: "product-catalog",
      stateHandlers: {
        "product exists": async () => {
          return Promise.resolve("product exists");
        },
        ops: async () => {
          process.env.PRODUCTS_FILE = "product-db-ops.json";
          return Promise.resolve("products in file does not exist");
        },
      },
    }).verifyProvider();
  });
});
