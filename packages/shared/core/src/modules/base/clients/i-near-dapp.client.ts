import { MsgFakSign, MsgSignInitialTx } from "../msgs";

/**
 * @description Interface for a client.
 */
export interface INearDAppClient {
    /**
     * Returns the account ID.
     * @returns The account ID.
     */
    accountId(): string;

    /**
     * Returns the account ID.
     * @returns The signing URL.
     */
    signingURL(): string;

    /**
     * Signs an initial transaction.
     * @param msg The message to sign.
     */
    signInitialTx(msg: MsgSignInitialTx): void;

    /**
     * Signs a transaction with a fake signature.
     * @param msg The message to sign.
     */
    signWithFak(msg: MsgFakSign): void;
}
