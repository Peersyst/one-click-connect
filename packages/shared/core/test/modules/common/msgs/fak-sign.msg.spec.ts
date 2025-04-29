import { MsgErrorCodes, MsgFakSign } from "../../../../src/modules";
import { TransactionCodecGlobalMock } from "../../../mocks";
import { TransactionMock } from "../../../mocks/near/transaction.mock";

describe("MsgFakSign", () => {
    const transactionCodecGlobalMock = new TransactionCodecGlobalMock();

    const mockTransaction = new TransactionMock();
    const mockRedirectURL = "https://example.com/redirect";
    const mockEncodedTransaction = "mockEncodedTransaction";

    beforeEach(() => {
        transactionCodecGlobalMock.clearMocks();
    });

    describe("fromURL", () => {
        it("should create a MsgFakSign from a URL", () => {
            const url = `https://example.com?transaction=${mockEncodedTransaction}&redirectURL=${encodeURIComponent(mockRedirectURL)}`;

            const msg = MsgFakSign.fromURL(url);

            expect(msg).toBeDefined();
            expect(transactionCodecGlobalMock.fromURLParam).toHaveBeenCalledWith(mockEncodedTransaction);
        });

        it("should throw if transaction is missing", () => {
            const url = `https://example.com?redirectURL=${encodeURIComponent(mockRedirectURL)}`;

            expect(() => MsgFakSign.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
        });

        it("should throw if redirectURL is missing", () => {
            const url = `https://example.com?transaction=${mockEncodedTransaction}`;

            expect(() => MsgFakSign.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
        });
    });

    describe("toURL", () => {
        it("should create a URL from a MsgFakSign", () => {
            const msg = new MsgFakSign(mockTransaction, mockRedirectURL);
            const url = msg.toURL(mockRedirectURL);

            expect(url).toBeDefined();
            expect(transactionCodecGlobalMock.toURLParam).toHaveBeenCalledWith(mockTransaction);
        });
    });

    describe("get transaction", () => {
        it("should return the transaction", () => {
            const msg = new MsgFakSign(mockTransaction, mockRedirectURL);
            expect(msg.transaction).toBe(mockTransaction);
        });
    });

    describe("get redirectURL", () => {
        it("should return the redirectURL", () => {
            const msg = new MsgFakSign(mockTransaction, mockRedirectURL);
            expect(msg.redirectURL).toBe(mockRedirectURL);
        });
    });
});
