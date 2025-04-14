import { MsgFakSign, MsgSignIn } from "../msgs";

/**
 * @description Interface for a client.
 */
export interface INearDAppClient {
    /**
     * @description Signs an initial transaction.
     * @param msg The message to sign.
     */
    signInitialTx(msg: MsgSignIn): void;

    /**
     * @description Signs a transaction with a fake signature.
     * @param msg The message to sign.
     */
    signWithFak(msg: MsgFakSign): void;
}
