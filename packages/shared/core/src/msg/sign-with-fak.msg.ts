import { MsgErrorCodes } from "../error";

export enum MsgSignWithFAKQueryParams {
    INSTRUCTIONS = "instructions",
}

/**
 * Message for signing a transaction with FAK.
 */
export class MsgSignWithFAK {
    transactions: unknown[];
    redirectURL: string;

    /**
     * Creates a new MsgSignWithFAK object.
     * @param transactions The transactions.
     * @param redirectURL The redirectURL.
     */
    constructor(transactions: unknown[], redirectURL: string) {
        this.transactions = transactions;
        this.redirectURL = redirectURL;
    }

    /**
     * Creates a new MsgSignWithFAK object from a URL.
     * @param url The URL to create the MsgSignWithFAK object from.
     * @returns A new MsgSignWithFAK object.
     */
    static fromURL(url: string): MsgSignWithFAK {
        const urlObj = new URL(url);

        const instructions = urlObj.searchParams.get(MsgSignWithFAKQueryParams.INSTRUCTIONS);
        if (!instructions) {
            throw new Error(MsgErrorCodes.INVALID_SIGN_WITH_FAK_URL);
        }
        const instructionsDecoded = Buffer.from(instructions, "base64").toString("utf-8");
        const { transactions, redirectUrl } = JSON.parse(instructionsDecoded);

        if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
            throw new Error(MsgErrorCodes.INVALID_SIGN_WITH_FAK_TRANSACTIONS);
        }

        if (!redirectUrl || !URL.canParse(redirectUrl)) {
            throw new Error(MsgErrorCodes.INVALID_SIGN_WITH_FAK_REDIRECT_URL);
        }

        return new MsgSignWithFAK(transactions, redirectUrl);
    }

    /**
     * Creates a URL from the MsgSignWithFAK object.
     * @param url The URL to create the MsgSignWithFAK object from.
     * @returns A URL.
     */
    toURL(url: string): string {
        const urlObj = new URL(url);

        const instructions = {
            transactions: this.transactions,
            redirectUrl: this.redirectURL,
        };

        const base64Instructions = Buffer.from(JSON.stringify(instructions)).toString("base64");

        urlObj.searchParams.set(MsgSignWithFAKQueryParams.INSTRUCTIONS, base64Instructions);

        return urlObj.toString();
    }
}
