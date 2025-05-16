import { ClientFactory } from "../../src/clients/client.factory";
import { NearRelayerDAppClientConfig } from "../../src/clients/near-relayer/near-relayer-dapp.client.config";
import { NearDAppClientConfig } from "../../src/clients/near/near-dapp.client.config";
import { RelayerAPIMock } from "@one-click-connect/core/mocks";

describe("ClientFactory", () => {
    describe("newClient", () => {
        it("should create a client from a given config", () => {
            const config: NearDAppClientConfig = {
                redirectURL: "https://example.com",
            };

            const client = ClientFactory.newClient(config);

            expect(client.getConfig()).toEqual(config);
        });
    });

    describe("newRelayerClient", () => {
        const relayerAPI = new RelayerAPIMock();
        it("should create a client from a given config (with relayerAPI)", () => {
            const config: NearRelayerDAppClientConfig = {
                redirectURL: "https://example.com",
                relayerAPI,
            };

            const client = ClientFactory.newRelayerClient(config);

            expect(client.getConfig()).toEqual(config);
        });

        it("should create a client from a given config (without relayerAPI)", () => {
            const config: NearRelayerDAppClientConfig = {
                redirectURL: "https://example.com",
            };

            const client = ClientFactory.newRelayerClient(config);

            expect(client.getConfig()).toEqual(config);
        });
    });
});
