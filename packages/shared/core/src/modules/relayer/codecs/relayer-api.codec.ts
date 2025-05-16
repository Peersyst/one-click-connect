import { CodecError, CodecErrorCodes } from "../../common/codecs/errors";
import { CodecType } from "../../common/codecs/types";
import { RelayerAPI } from "../types/relayer-api";

export class RelayerAPICodec {
    /**
     * Decodes a relayer API from a URL parameter.
     * @param relayerAPI The relayer API to decode.
     * @returns The decoded relayer API.
     */
    static fromURLParam(relayerAPI: string): RelayerAPI {
        try {
            const relayer = JSON.parse(Buffer.from(relayerAPI, "base64").toString("utf-8"));
            return relayer as RelayerAPI;
        } catch (_: unknown) {
            throw new CodecError(CodecType.RELAYER_API_CODEC, CodecErrorCodes.ERROR_DECODING_URL);
        }
    }

    /**
     * Encodes a relayer API to a URL parameter.
     * @param relayerAPI The relayer API to encode.
     * @returns The encoded relayer API.
     */
    static toURLParam(relayerAPI: RelayerAPI): string {
        try {
            return Buffer.from(JSON.stringify(relayerAPI)).toString("base64");
        } catch (_: unknown) {
            throw new CodecError(CodecType.RELAYER_API_CODEC, CodecErrorCodes.ERROR_ENCODING_URL);
        }
    }
}
