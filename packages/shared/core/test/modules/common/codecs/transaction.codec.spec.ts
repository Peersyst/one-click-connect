import { TransactionCodec } from "../../../../src/modules/common/codecs";
import { CodecErrorCodes } from "../../../../src/modules/common/codecs/errors";
import { CodecType } from "../../../../src/modules/common/codecs/types";

describe("TransactionCodec", () => {
    describe("fromURLParam", () => {
        it("should throw an error if the transaction is not provided", () => {
            expect(() => TransactionCodec.fromURLParam("")).toThrow(
                `${CodecType.TRANSACTION_CODEC}: ${CodecErrorCodes.ERROR_DECODING_URL}`,
            );
        });

        it("should throw an error if the transaction is not valid", () => {
            expect(() => TransactionCodec.fromURLParam("invalid")).toThrow(
                `${CodecType.TRANSACTION_CODEC}: ${CodecErrorCodes.ERROR_DECODING_URL}`,
            );
        });

        it("should return a transaction", () => {
            const transaction = TransactionCodec.fromURLParam(
                "DAAAAG1vY2tTaWduZXJJZACcdRJ+JQOaKfqxr8M0e4Ylfcz1E107wi1yLO+td5FwvAEAAAAAAAAADgAAAG1vY2tSZWNlaXZlcklko7RnCT5MjkhJMV2ASLYPwYZorzhqPrGdadCYH6KZGxQAAAAA",
            );
            expect(transaction).toBeDefined();
        });
    });

    describe("toURLParam", () => {
        it("should throw an error if the transaction is not provided", () => {
            expect(() => TransactionCodec.toURLParam(null)).toThrow(
                `${CodecType.TRANSACTION_CODEC}: ${CodecErrorCodes.ERROR_ENCODING_URL}`,
            );
        });

        it("should throw an error if the transaction is not valid", () => {
            expect(() => TransactionCodec.toURLParam("invalid")).toThrow(
                `${CodecType.TRANSACTION_CODEC}: ${CodecErrorCodes.ERROR_ENCODING_URL}`,
            );
        });

        it("should return a URL", () => {
            const encodedTransaction =
                "DAAAAG1vY2tTaWduZXJJZACcdRJ+JQOaKfqxr8M0e4Ylfcz1E107wi1yLO+td5FwvAEAAAAAAAAADgAAAG1vY2tSZWNlaXZlcklko7RnCT5MjkhJMV2ASLYPwYZorzhqPrGdadCYH6KZGxQAAAAA";
            const url = TransactionCodec.toURLParam(TransactionCodec.fromURLParam(encodedTransaction));
            expect(url).toEqual(encodedTransaction);
        });
    });
});
