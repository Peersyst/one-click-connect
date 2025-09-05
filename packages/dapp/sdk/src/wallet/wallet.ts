import { Transaction } from "../clients";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { Wallet } from "@one-click-connect/dapp-core";
import { Permissions } from "@one-click-connect/core";
import { Account, KeyPair, Near } from "near-api-js";
import { KeyStore } from "near-api-js/lib/key_stores";
import { AccessKeyInfoView } from "near-api-js/lib/providers/provider";

export type KeyPairString = `ed25519:${string}` | `secp256k1:${string}`;

export class NearWallet implements Wallet<Transaction, FinalExecutionOutcome> {
    constructor(
        private readonly near: Near,
        private readonly keyStore: KeyStore,
        private readonly permissions: Permissions,
    ) {}

    /**
     * Derives and returns the public key corresponding to the given private key.
     * @param privateKey The private key from which to derive the public key.
     * @returns The derived public key as a string.
     */
    private getPublicKey(privateKey: string): string {
        const keyPair = KeyPair.fromString(privateKey as KeyPairString);
        return keyPair.getPublicKey().toString();
    }

    /**
     * Given an account id and an access key, finds the access key info view.
     * @param accountId The account id where the access key is.
     * @param accessKey The accessKey.
     * @returns The access key info.
     */
    private async getAccessKeyInfo(accountId: string, accessKey: string): Promise<AccessKeyInfoView | undefined> {
        const account = await this.near.account(accountId);
        const accountAccessKeys = await account.getAccessKeys();
        const publicKey = this.getPublicKey(accessKey);
        return accountAccessKeys.find(({ public_key }) => public_key === publicKey);
    }

    /**
     * @inheritDoc
     */
    async hasAccessKey(accountId: string, accessKey: string): Promise<boolean> {
        const accessKeyInfo = await this.getAccessKeyInfo(accountId, accessKey);
        return !!accessKeyInfo;
    }

    /**
     * @inheritDoc
     */
    async canAccessKeyExecute(accountId: string, accessKey: string, transaction: Transaction): Promise<boolean> {
        const accessKeyInfo = await this.getAccessKeyInfo(accountId, accessKey);
        if (!accessKeyInfo) return false;
        const { permission } = accessKeyInfo.access_key;
        if (permission === "FullAccess") {
            return true;
        }

        if (permission.FunctionCall) {
            const { receiver_id: allowedReceiverId, method_names: allowedMethods } = permission.FunctionCall;
            if (allowedReceiverId === (transaction.receiverId ?? this.permissions.receiverId)) {
                let allowed = true;

                for (const action of transaction.actions) {
                    if (
                        !(
                            action.functionCall &&
                            (!action.functionCall.deposit || action.functionCall.deposit.toString() === "0") && // TODO: Should support charging amount smaller than allowance?
                            (allowedMethods.length === 0 ||
                                allowedMethods.includes("*") ||
                                allowedMethods.includes(action.functionCall.methodName))
                        )
                    ) {
                        allowed = false;
                        break;
                    }
                }
                return allowed;
            }
        }
        return false;
    }

    /**
     * @inheritDoc
     */
    async generateAccessKey(): Promise<string> {
        return KeyPair.fromRandom("ed25519").toString();
    }

    /**
     * @inheritDoc
     */
    derivePublicKey(accessKey: string): string {
        const keyPair = KeyPair.fromString(accessKey as KeyPairString);
        return keyPair.getPublicKey().toString();
    }

    /**
     * @inheritDoc
     */
    async signAndSendTransaction(accountId: string, accessKey: string, transaction: Transaction): Promise<FinalExecutionOutcome> {
        await this.keyStore.setKey(this.near.connection.networkId, accountId, KeyPair.fromString(accessKey! as KeyPairString));
        const signer = new Account(this.near.connection, accountId);
        return signer.signAndSendTransaction({
            receiverId: transaction.receiverId ?? this.permissions.receiverId,
            actions: transaction.actions,
        });
    }

    /**
     * @inheritDoc
     */
    async signMessage(accessKey: string, message: string): Promise<string> {
        const keyPair = KeyPair.fromString(accessKey as KeyPairString);
        const signature = keyPair.sign(Buffer.from(message));
        return Buffer.from(signature.signature).toString("hex");
    }
}
