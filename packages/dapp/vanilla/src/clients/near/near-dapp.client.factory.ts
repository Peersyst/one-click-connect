import { NearDAppClient as CoreNearDAppClient } from "@one-click-connect/dapp-core/clients";
import { AccountService, AccountLocalStorageRepository } from "@one-click-connect/dapp-core/account";
import { NearDAppClientConfig } from "./near-dapp.client.config";

export class NearDAppClientFactory {
    /**
     * Creates a new NearDAppClient instance from a given config.
     * @param config The config to create the client with.
     * @returns A new NearDAppClient instance.
     */
    static fromConfig(config: NearDAppClientConfig): CoreNearDAppClient<NearDAppClientConfig> {
        return new CoreNearDAppClient(config, new AccountService(new AccountLocalStorageRepository()));
    }
}
