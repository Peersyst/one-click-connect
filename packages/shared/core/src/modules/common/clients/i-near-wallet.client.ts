import { MsgSignIn } from "../msgs";

/**
 * @description Interface for a wallet.
 */
export interface INearWalletClient {
    /**
     * @description Signs in to the wallet.
     * @param msg - The message to sign.
     */
    signIn(msg: MsgSignIn): void;
}
