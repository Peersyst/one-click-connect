import { INearDAppClient } from "../../base";
import { RelayerAPI } from "../types";
export interface INearRelayerDAppClient extends Omit<INearDAppClient, "isSignedIn"> {
    /**
     * @description Signs in to the relayer.
     * @param accountID The account ID to sign in.
     * @param signingURL The signing URL to sign in.
     * @param relayerAPI The relayer API to sign in.
     * @returns True if the user is signed in, false otherwise.
     */
    isSignedIn(accountID: string, signingURL: string, relayerAPI: RelayerAPI): boolean;
}
