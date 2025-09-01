import type { Optional } from "@near-wallet-selector/core/src/lib/utils.types";
import type { Action, Transaction } from "@near-wallet-selector/core/src/lib/wallet/transactions.types";

export interface SignAndSendTransactionsParams {
    /**
     * NEAR Transactions(s) to sign and send to the network. You can find more information on `Transaction` {@link https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/transactions.md | here}.
     */
    transactions: Array<Optional<Transaction, "signerId">>;
}

export interface SignAndSendTransactionParams {
    /**
     * Account ID used to sign the transaction. Defaults to the first account.
     */
    signerId?: string;
    /**
     * Account ID to receive the transaction. Defaults to `contractId` defined in `init`.
     */
    receiverId?: string;
    /**
     * NEAR Action(s) to sign and send to the network (e.g. `FunctionCall`). You can find more information on `Action` {@link https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/transactions.md | here}.
     */
    actions: Array<Action>;
}
