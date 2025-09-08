import { MsgSignIn } from "@one-click-connect/core";

export class Account {
    constructor(
        readonly accountId: string,
        readonly signingURL: string,
        readonly walletId?: string,
        public accessKey?: string,
    ) {}

    /**
     * Converts an Account object to a string.
     * @returns The encoded Account.
     */
    toString(): string {
        return JSON.stringify({
            accountId: this.accountId,
            signingURL: this.signingURL,
            walletId: this.walletId,
            accessKey: this.accessKey,
        });
    }

    /**
     * Creates an Account object from a string.
     * @param str The encoded Account string.
     * @returns The Account object.
     */
    static fromString(str: string) {
        const { accountId, signingURL, walletId, accessKey } = JSON.parse(str);
        return new Account(accountId, signingURL, walletId, accessKey);
    }

    /**
     * Creates an Account object from a MsgSignIn.
     * @param msg The MsgSignIn.
     * @returns The Account object.
     */
    static fromMsgSignIn(msg: MsgSignIn) {
        return new Account(msg.accountID, msg.signingURL, msg.walletId, msg.accessKey);
    }
}
