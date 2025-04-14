import { MsgSignInitialTx } from "../../../../src/modules/common/msgs";
import { MsgErrorCodes } from "../../../../src/modules/common/msgs/errors";
import { PermissionsCodecGlobalMock } from "../../../mocks/permissions.codec.global-mock";
import { PublicKeyCodecGlobalMock } from "../../../mocks/public-key.codec.global-mock";
import { TransactionCodecGlobalMock } from "../../../mocks/transaction.codec.mock";
import { TransactionMock } from "../../../mocks/transaction.mock";

describe("MsgSignInitialTx", () => {
    const transactionCodecGlobalMock = new TransactionCodecGlobalMock();
    const permissionsCodecGlobalMock = new PermissionsCodecGlobalMock();
    const publicKeyCodecGlobalMock = new PublicKeyCodecGlobalMock();

    const mockTransaction = new TransactionMock();
    const mockRedirectURL = "mockEncodedRedirectURL";
    const mockPermissions = {};
    const mockPublicKey = "mockEncodedPublicKey";

    beforeEach(() => {
        transactionCodecGlobalMock.clearMocks();
        permissionsCodecGlobalMock.clearMocks();
        publicKeyCodecGlobalMock.clearMocks();
    });

    describe("fromURL", () => {
        describe("should throw an error if transaction is not provided", () => {
            it("should throw an error if transaction is not provided", () => {
                const url = "https://example.com";
                expect(() => MsgSignInitialTx.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should throw an error if redirectURL is not provided", () => {
            it("should throw an error if redirectURL is not provided", () => {
                const urlTransaction = "mockEncodedTransaction";
                const url = `https://example.com?transaction=${urlTransaction}`;
                expect(() => MsgSignInitialTx.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should throw an error if permissions are not provided", () => {
            it("should throw an error if permissions are not provided", () => {
                const urlTransaction = "mockEncodedTransaction";
                const urlRedirectURL = "mockEncodedRedirectURL";
                const url = `https://example.com?transaction=${urlTransaction}&redirectURL=${urlRedirectURL}`;
                expect(() => MsgSignInitialTx.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should throw an error if publicKey is not provided", () => {
            it("should throw an error if publicKey is not provided", () => {
                const urlTransaction = "mockEncodedTransaction";
                const urlRedirectURL = "mockEncodedRedirectURL";
                const urlPermissions = "mockEncodedPermissions";
                const url = `https://example.com?transaction=${urlTransaction}&redirectURL=${urlRedirectURL}&permissions=${urlPermissions}`;
                expect(() => MsgSignInitialTx.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should create a new MsgSignInitialTx object", () => {
            it("should create a new MsgSignInitialTx object", () => {
                const urlTransaction = "mockEncodedTransaction";
                const urlRedirectURL = "mockEncodedRedirectURL";
                const urlPermissions = "mockEncodedPermissions";
                const urlPublicKey = "mockEncodedPublicKey";

                const url = `https://example.com?transaction=${urlTransaction}&redirectURL=${urlRedirectURL}&permissions=${urlPermissions}&publicKey=${urlPublicKey}`;
                const msg = MsgSignInitialTx.fromURL(url);

                expect(msg).toBeDefined();

                expect(transactionCodecGlobalMock.fromURLParam).toHaveBeenCalledWith(urlTransaction);
                expect(permissionsCodecGlobalMock.fromURLParam).toHaveBeenCalledWith(urlPermissions);
                expect(publicKeyCodecGlobalMock.fromURLParam).toHaveBeenCalledWith(urlPublicKey);
            });
        });
    });

    describe("toURL", () => {
        it("should return a URL", () => {
            const url = "https://example.com";

            const msg = new MsgSignInitialTx(mockTransaction, mockRedirectURL, mockPermissions, mockPublicKey);
            const urlResult = msg.toURL(url);

            expect(urlResult).toBeDefined();
            expect(permissionsCodecGlobalMock.toURLParam).toHaveBeenCalledWith(mockPermissions);
            expect(transactionCodecGlobalMock.toURLParam).toHaveBeenCalledWith(mockTransaction);
            expect(publicKeyCodecGlobalMock.toURLParam).toHaveBeenCalledWith(mockPublicKey);
        });
    });

    describe("get transaction", () => {
        it("should return the transaction", () => {
            const msg = new MsgSignInitialTx(mockTransaction, mockRedirectURL, mockPermissions, mockPublicKey);
            expect(msg.transaction).toEqual(mockTransaction);
        });
    });

    describe("get redirectURL", () => {
        it("should return the redirectURL", () => {
            const msg = new MsgSignInitialTx(mockTransaction, mockRedirectURL, mockPermissions, mockPublicKey);
            expect(msg.redirectURL).toEqual(mockRedirectURL);
        });
    });
});
