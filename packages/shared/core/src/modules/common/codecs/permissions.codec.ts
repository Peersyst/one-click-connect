import { CodecError, CodecErrorCodes } from "./errors";
import { CodecType } from "./types";
import { FunctionCallPermission } from "near-api-js/lib/transaction";

/**
 * @description Codec for permissions.
 */
export class PermissionsCodec {
    private static permissionsReviver(key: string, value: any) {
        if (key === "allowance" && typeof value === "string") {
            return BigInt(value);
        }
        return value;
    }

    /**
     * Decodes a permissions object from a URL.
     * @param permissions The permissions object to decode.
     * @returns The decoded permissions object.
     */
    static fromURLParam(permissions: string): FunctionCallPermission {
        try {
            const parsed = JSON.parse(Buffer.from(permissions, "base64").toString("utf-8"), this.permissionsReviver);
            return parsed as FunctionCallPermission;
        } catch (_: unknown) {
            throw new CodecError(CodecType.PERMISSIONS_CODEC, CodecErrorCodes.ERROR_DECODING_URL);
        }
    }

    /**
     * Encodes a permissions object to a URL.
     * @param permissions The permissions object to encode.
     * @returns The encoded permissions object.
     */
    static toURLParam(permissions: FunctionCallPermission): string {
        try {
            return Buffer.from(JSON.stringify(permissions, (_, v) => (typeof v === "bigint" ? v.toString() : v))).toString("base64");
        } catch (e: unknown) {
            console.error(e);
            throw new CodecError(CodecType.PERMISSIONS_CODEC, CodecErrorCodes.ERROR_ENCODING_URL);
        }
    }
}
