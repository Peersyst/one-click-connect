import { INearDAppClient } from "../../base";

export interface INearRelayerDAppClient extends INearDAppClient {
    /**
     * @description Returns the relayer API URL.
     * @returns The relayer API URL.
     */
    relayerAPI(): string;
}
