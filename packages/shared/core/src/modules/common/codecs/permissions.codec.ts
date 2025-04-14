import { CodecError, CodecErrorCodes } from "./errors";
import { CodecType } from "./types";

/**
 * @description Codec for permissions.
 */
export class PermissionsCodec {
    /**
     * @description Decodes a permissions object from a URL.
     * @param permissions - The permissions object to decode.
     * @returns The decoded permissions object.
     */
    static fromURLParam(permissions: string): object {
        try {
            return JSON.parse(Buffer.from(permissions, "base64").toString("utf-8"));
        } catch (error) {
            throw new CodecError(CodecType.PERMISSIONS_CODEC, CodecErrorCodes.ERROR_DECODING_URL);
        }
    }

    /**
     * @description Encodes a permissions object to a URL.
     * @param permissions - The permissions object to encode.
     * @returns The encoded permissions object.
     */
    static toURLParam(permissions: object): string {
        try {
            return Buffer.from(JSON.stringify(permissions)).toString("base64");
        } catch (error) {
            throw new CodecError(CodecType.PERMISSIONS_CODEC, CodecErrorCodes.ERROR_ENCODING_URL);
        }
    }
}
