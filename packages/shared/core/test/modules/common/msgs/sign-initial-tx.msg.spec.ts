import { MsgErrorCodes, MsgSignInitialTx } from "../../../../src/modules";
import { TransactionCodecGlobalMock, PermissionsCodecGlobalMock, PublicKeyCodecGlobalMock } from "../../../mocks/core";

describe("MsgSignInitialTx", () => {
    const transactionCodecGlobalMock = new TransactionCodecGlobalMock();
    const permissionsCodecGlobalMock = new PermissionsCodecGlobalMock();
    const publicKeyCodecGlobalMock = new PublicKeyCodecGlobalMock();

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
                const url = `https://example.com`;
                expect(() => MsgSignInitialTx.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should throw an error if permissions are not provided", () => {
            it("should throw an error if permissions are not provided", () => {
                const urlRedirectURL = "mockEncodedRedirectURL";
                const url = `https://example.com?redirectURL=${urlRedirectURL}`;
                expect(() => MsgSignInitialTx.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should throw an error if publicKey is not provided", () => {
            it("should throw an error if publicKey is not provided", () => {
                const urlRedirectURL = "mockEncodedRedirectURL";
                const urlPermissions = "mockEncodedPermissions";
                const url = `https://example.com?redirectURL=${urlRedirectURL}&permissions=${urlPermissions}`;
                expect(() => MsgSignInitialTx.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should create a new MsgSignInitialTx object", () => {
            it("should create a new MsgSignInitialTx object", () => {
                const urlRedirectURL = "mockEncodedRedirectURL";
                const urlPermissions = "mockEncodedPermissions";
                const urlPublicKey = "mockEncodedPublicKey";

                const url = `https://example.com?redirectURL=${urlRedirectURL}&permissions=${urlPermissions}&publicKey=${urlPublicKey}`;
                const msg = MsgSignInitialTx.fromURL(url);

                expect(msg).toBeDefined();

                expect(permissionsCodecGlobalMock.fromURLParam).toHaveBeenCalledWith(urlPermissions);
                expect(publicKeyCodecGlobalMock.fromURLParam).toHaveBeenCalledWith(urlPublicKey);
            });
        });
    });

    describe("toURL", () => {
        it("should return a URL", () => {
            const url = "https://example.com";

            const msg = new MsgSignInitialTx(mockRedirectURL, mockPermissions, mockPublicKey);
            const urlResult = msg.toURL(url);

            expect(urlResult).toBeDefined();
            expect(permissionsCodecGlobalMock.toURLParam).toHaveBeenCalledWith(mockPermissions);
            expect(publicKeyCodecGlobalMock.toURLParam).toHaveBeenCalledWith(mockPublicKey);
        });
    });

    describe("get redirectURL", () => {
        it("should return the redirectURL", () => {
            const msg = new MsgSignInitialTx(mockRedirectURL, mockPermissions, mockPublicKey);
            expect(msg.redirectURL).toEqual(mockRedirectURL);
        });
    });
});
