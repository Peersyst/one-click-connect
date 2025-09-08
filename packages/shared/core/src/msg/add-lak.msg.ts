import { MsgErrorCodes } from "../error";

export type Permissions = {
    receiverId: string;
    methodNames: string[];
    allowance?: bigint | string;
};

export enum MsgAddLAKQueryParams {
    INSTRUCTIONS = "instructions",
}

/**
 * Message for signing a limited access key.
 */
export class MsgAddLAK {
    redirectURL: string;
    permissions: Permissions;
    publicKey: string;

    /**
     * Creates a new MsgAddLak object.
     * @param redirectURL The redirect URL.
     * @param permissions The permissions.
     * @param publicKey The public key.
     */
    constructor(redirectURL: string, permissions: Permissions, publicKey: string) {
        this.redirectURL = redirectURL;
        this.permissions = permissions;
        this.publicKey = publicKey;
    }

    /**
     * Creates a new MsgAddLak object from a URL.
     * @param url The URL to create the MsgAddLak object from.
     * @returns A new MsgAddLak object.
     */
    static fromURL(url: string): MsgAddLAK {
        const urlObj = new URL(url);

        const instructions = urlObj.searchParams.get(MsgAddLAKQueryParams.INSTRUCTIONS);
        if (!instructions) {
            throw new Error(MsgErrorCodes.INVALID_ADD_LAK_URL);
        }
        const instructionsDecoded = Buffer.from(instructions, "base64").toString("utf-8");
        const { redirectUrl, limitedAccessKey } = JSON.parse(instructionsDecoded);
        if (!redirectUrl || !URL.canParse(redirectUrl)) {
            throw new Error(MsgErrorCodes.INVALID_ADD_LAK_REDIRECT_URL);
        }
        if (!limitedAccessKey || typeof limitedAccessKey !== "object") {
            throw new Error(MsgErrorCodes.INVALID_ADD_LAK_LIMITED_ACCESS_KEY);
        }
        if (!limitedAccessKey.publicKey || typeof limitedAccessKey.publicKey !== "string") {
            throw new Error(MsgErrorCodes.INVALID_ADD_LAK_LIMITED_ACCESS_KEY_PUBLIC_KEY);
        }
        if (!limitedAccessKey.contractId || typeof limitedAccessKey.contractId !== "string") {
            throw new Error(MsgErrorCodes.INVALID_ADD_LAK_LIMITED_ACCESS_KEY_CONTRACT_ID);
        }
        if (!limitedAccessKey.methodNames || !Array.isArray(limitedAccessKey.methodNames)) {
            throw new Error(MsgErrorCodes.INVALID_ADD_LAK_LIMITED_ACCESS_KEY_METHOD_NAMES);
        }
        if (
            limitedAccessKey.allowance &&
            typeof limitedAccessKey.allowance !== "bigint" &&
            typeof limitedAccessKey.allowance !== "string"
        ) {
            throw new Error(MsgErrorCodes.INVALID_ADD_LAK_LIMITED_ACCESS_KEY_ALLOWANCE);
        }
        const permissions: Permissions = {
            receiverId: limitedAccessKey.contractId,
            methodNames: limitedAccessKey.methodNames,
            allowance: limitedAccessKey.allowance,
        };

        return new MsgAddLAK(redirectUrl, permissions, limitedAccessKey.publicKey);
    }

    /**
     * Creates a URL from the MsgAddLak object.
     * @param url The URL to create the MsgAddLak object from.
     * @returns A URL.
     */
    toURL(url: string): string {
        const urlObj = new URL(url);

        const instructions = {
            redirectUrl: this.redirectURL,
            limitedAccessKey: {
                publicKey: this.publicKey.toString(),
                contractId: this.permissions.receiverId,
                methodNames: this.permissions.methodNames,
                allowance: this.permissions.allowance,
            },
        };

        const base64Instructions = Buffer.from(JSON.stringify(instructions)).toString("base64");

        urlObj.searchParams.set(MsgAddLAKQueryParams.INSTRUCTIONS, base64Instructions);

        return urlObj.toString();
    }
}
