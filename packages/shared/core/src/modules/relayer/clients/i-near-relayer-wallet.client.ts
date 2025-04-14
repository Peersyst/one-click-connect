import { INearWalletClient } from "../../common/clients/i-near-wallet.client";
import { MsgRelaySignIn } from "../msgs";

/**
 * @description Interface for a near relayer wallet client.
 */
export interface INearRelayerWalletClient extends INearWalletClient {
    /**
     * @description Signs in to the wallet with a relayer.
     * @param msg The message to sign.
     */
    signInWithRelayer(msg: MsgRelaySignIn): void;
}
