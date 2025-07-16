import { WalletClient as CoreWalletClient } from "@one-click-connect/wallet-core";
import { WalletClientConfig } from "./wallet.client.config";

export class WalletClient extends CoreWalletClient<WalletClientConfig> {
    constructor(config: WalletClientConfig) {
        super(config);
    }
}
