import { PublicKey } from "near-api-js/lib/utils";
import { CodecError, CodecErrorCodes } from "./errors";
import { CodecType } from "./types";

/**
 * @description Codec for public keys.
 */
export class PublicKeyCodec {
    /**
     * Decodes a public key from a URL.
     * @param publicKey The public key to decode.
     * @returns The decoded public key.
     */
    static fromURLParam(publicKey: string): PublicKey {
        try {
            return PublicKey.fromString(publicKey);
        } catch (_: unknown) {
            throw new CodecError(CodecType.PUBLIC_KEY_CODEC, CodecErrorCodes.ERROR_DECODING_URL);
        }
    }

    /**
     * Encodes a public key to a URL.
     * @param publicKey The public key to encode.
     * @returns The encoded public key.
     */
    static toURLParam(publicKey: PublicKey): string {
        try {
            return publicKey.toString();
        } catch (_: unknown) {
            throw new CodecError(CodecType.PUBLIC_KEY_CODEC, CodecErrorCodes.ERROR_ENCODING_URL);
        }
    }
}
