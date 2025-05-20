import { ClientFactory } from "../../src/clients/client.factory";
import { RelayerClientConfig } from "../../src/clients/near-relayer/relayer.client.config";
import { ClientConfig } from "../../src/clients/near/client.config";

describe("ClientFactory", () => {
    describe("newClient", () => {
        it("should create a client from a given config", () => {
            const config: ClientConfig = {
                redirectURL: "https://example.com",
            };

            const client = ClientFactory.newClient(config);

            expect(client.getConfig()).toEqual(config);
        });
    });

    describe("newRelayerClient", () => {
        it("should create a client from a given config (with relayerAPI)", () => {
            const config: RelayerClientConfig = {
                redirectURL: "https://example.com",
                relayerAPI: "https://example.com/relayer",
            };

            const client = ClientFactory.newRelayerClient(config);

            expect(client.getConfig()).toEqual(config);
        });

        it("should create a client from a given config (without relayerAPI)", () => {
            const config: RelayerClientConfig = {
                redirectURL: "https://example.com",
            };

            const client = ClientFactory.newRelayerClient(config);

            expect(client.getConfig()).toEqual(config);
        });
    });
});
