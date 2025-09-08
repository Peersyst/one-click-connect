import {
    Account as WalletSelectorAccount,
    FinalExecutionOutcome,
    InstantLinkWallet,
    SignedMessage,
    SignInParams,
    SignMessageParams,
    VerifiedOwner,
    VerifyOwnerParams,
} from "@near-wallet-selector/core";
import { SignAndSendTransactionParams, SignAndSendTransactionsParams } from "./types";
import { FunctionCallPermission } from "near-api-js/lib/transaction";
import { DAppClient } from "@one-click-connect/dapp-sdk";
import { createAction } from "@near-wallet-selector/wallet-utils";
import { ErrorCodes } from "./errors";

export class Wallet implements Omit<InstantLinkWallet, "id" | "type" | "metadata"> {
    constructor(
        private readonly client: DAppClient,
        private readonly permissions: FunctionCallPermission,
    ) {}

    /**
     * @inheritDoc
     */
    signIn = async (_: SignInParams): Promise<WalletSelectorAccount[]> => {
        return this.getAccounts();
    };

    /**
     * @inheritDoc
     */
    signOut = async (): Promise<void> => {
        this.client.disconnect();
    };

    /**
     * @inheritDoc
     */
    getAccounts = async (): Promise<WalletSelectorAccount[]> => {
        return [
            {
                accountId: this.client.accountId,
                publicKey: this.client.accessKey ? this.client.publicKey : undefined,
            },
        ];
    };

    /**
     * @inheritDoc
     */
    verifyOwner = (_: VerifyOwnerParams): Promise<VerifiedOwner | void> => {
        throw new Error(ErrorCodes.METHOD_NOT_IMPLEMENTED);
    };

    /**
     * @inheritDoc
     */
    signAndSendTransaction = async (params: SignAndSendTransactionParams): Promise<FinalExecutionOutcome> => {
        const actions = params.actions.map((action) => createAction(action));
        const result = await this.client.signAndSendTransaction({
            signerId: params.signerId,
            receiverId: params.receiverId ?? this.permissions.receiverId,
            actions,
        });
        if (!result) throw new Error(ErrorCodes.UNREACHABLE);
        return result;
    };

    /**
     * @inheritDoc
     */
    signAndSendTransactions = async (params: SignAndSendTransactionsParams): Promise<Array<FinalExecutionOutcome>> => {
        const results: FinalExecutionOutcome[] = [];
        for (const transaction of params.transactions) {
            results.push(await this.signAndSendTransaction(transaction));
        }
        return results;
    };

    /**
     * @inheritDoc
     */
    signMessage = async (params: SignMessageParams): Promise<SignedMessage | void> => {
        return {
            signature: await this.client.signMessage(params.message),
            accountId: this.client.accountId,
            publicKey: this.client.publicKey,
        };
    };

    /**
     * @inheritDoc
     */
    getContractId = (): string => {
        return this.permissions.receiverId;
    };
}
