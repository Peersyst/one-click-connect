import { SignInitialTxRequest } from "../../common/requests/sign-initial-tx.request";
import { MsgFakSign } from "../msgs";

/**
 * @description Interface for a client.
 */
export interface INearDAppClient {
    /**
     * Signs an initial transaction.
     * @param request The request to sign the transaction for.
     */
    signInitialTx(request: SignInitialTxRequest): string;

    /**
     * Signs a transaction with a fake signature.
     * @param msg The message to sign.
     */
    signWithFak(msg: MsgFakSign): void;
}
