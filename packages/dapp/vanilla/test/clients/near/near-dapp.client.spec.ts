import { NearDAppClientFactory } from "../../../src/clients/near";
import { NearDAppClientConfig } from "../../../src/clients/near/near-dapp.client.config";

describe("NearDAppClientFactory", () => {
    describe("fromConfig", () => {
        it("should create a client from a given config", () => {
            const config: NearDAppClientConfig = {
                redirectURL: "https://example.com",
            };

            const client = NearDAppClientFactory.fromConfig(config);

            expect(client.getConfig()).toEqual(config);
        });
    });
});
