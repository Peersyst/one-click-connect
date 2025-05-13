import {
    NearDAppClient as CoreNearDAppClient,
    NearRelayerDAppClient as CoreNearRelayerDAppClient,
} from "@one-click-connect/dapp-core/clients";
import { AccountService, AccountLocalStorageRepository } from "@one-click-connect/dapp-core/account";
import { NearDAppClientConfig } from "./near/near-dapp.client.config";
import { NearDAppClient } from "./near/near-dapp.client";
import { NearRelayerDAppClient, NearRelayerDAppClientConfig } from "./near-relayer";

/**
 * A factory for creating clients.
 */
export class ClientFactory {
    /**
     * Creates a new NearDAppClient instance from a given config.
     * @param config The config to create the client with.
     * @returns A new NearDAppClient instance.
     */
    static newClient(config: NearDAppClientConfig): NearDAppClient {
        return new CoreNearDAppClient(config, new AccountService(new AccountLocalStorageRepository()));
    }

    /**
     * Creates a new NearRelayerDAppClient instance from a given config.
     * @param config The config to create the client with.
     * @returns A new NearRelayerDAppClient instance.
     */
    static newRelayerClient(config: NearRelayerDAppClientConfig): NearRelayerDAppClient {
        return new CoreNearRelayerDAppClient(config, new AccountService(new AccountLocalStorageRepository()));
    }
}
