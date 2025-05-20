import { PublicKeyCodec } from "../../../../src/modules/common/codecs";
import { CodecErrorCodes } from "../../../../src/modules/common/codecs/errors";
import { CodecType } from "../../../../src/modules/common/codecs/types";

describe("PublicKeyCodec", () => {
    describe("fromURLParam", () => {
        it("should throw an error if the public key is not provided", () => {
            expect(() => PublicKeyCodec.fromURLParam("")).toThrow(`${CodecType.PUBLIC_KEY_CODEC}: ${CodecErrorCodes.ERROR_DECODING_URL}`);
        });

        it("should throw an error if the public key is not valid", () => {
            expect(() => PublicKeyCodec.fromURLParam("invalid")).toThrow(
                `${CodecType.PUBLIC_KEY_CODEC}: ${CodecErrorCodes.ERROR_DECODING_URL}`,
            );
        });

        it("should return a public key", () => {
            const encodedPublicKey = "ed25519:DYJYJT26BZVStUV9vm3rBY2gu812wTQwVFyk9Y4XcQf1";
            const publicKey = PublicKeyCodec.fromURLParam(encodedPublicKey);
            expect(publicKey).toBeDefined();
            expect(publicKey.toString()).toEqual(encodedPublicKey);
        });
    });

    describe("toURLParam", () => {
        it("should throw an error if the public key is not provided", () => {
            expect(() => PublicKeyCodec.toURLParam(null)).toThrow(`${CodecType.PUBLIC_KEY_CODEC}: ${CodecErrorCodes.ERROR_ENCODING_URL}`);
        });

        it("should return a URL", () => {
            const encodedPublicKey = "ed25519:DYJYJT26BZVStUV9vm3rBY2gu812wTQwVFyk9Y4XcQf1";
            const url = PublicKeyCodec.toURLParam(PublicKeyCodec.fromURLParam(encodedPublicKey));
            expect(url).toEqual(encodedPublicKey);
        });
    });
});
