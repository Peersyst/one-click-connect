import { WalletClient } from "../../src/client/wallet.client";
import { ClientErrorCodes } from "../../src/common/errors";
import { MsgFakSignStaticGlobalMock, TransactionMock, MsgSignInGlobalMock, MsgRelaySignInGlobalMock } from "@one-click-connect/core/mocks";

describe("WalletClient", () => {
    const msgSignInGlobalMock = new MsgSignInGlobalMock();
    const msgFakSignStaticGlobalMock = new MsgFakSignStaticGlobalMock();
    const msgRelaySignInGlobalMock = new MsgRelaySignInGlobalMock();

    beforeEach(() => {
        msgSignInGlobalMock.clearMocks();
        msgFakSignStaticGlobalMock.clearMocks();
        msgRelaySignInGlobalMock.clearMocks();
    });

    describe("requestSignIn", () => {
        it("should throw an error if the signing URL is not set", () => {
            const walletClient = new WalletClient({ signingURL: "" });
            expect(() => walletClient.requestSignIn("accountID", "url")).toThrow(ClientErrorCodes.SIGNING_URL_NOT_SET);
        });

        it("should return the signed in URL (without relayerAPI)", () => {
            const mockedUrl = "mockedUrl";
            msgSignInGlobalMock.toURL.mockReturnValue(mockedUrl);

            const walletClient = new WalletClient({ signingURL: "url" });

            expect(walletClient.requestSignIn("accountID", "url")).toBe(mockedUrl);
        });

        it("should return the signed in URL (with relayerAPI)", () => {
            const mockedUrl = "mockedUrl";
            msgRelaySignInGlobalMock.toURL.mockReturnValue(mockedUrl);

            const walletClient = new WalletClient({ signingURL: "url", relayerAPI: "relayerAPI" });

            expect(walletClient.requestSignIn("accountID", "url")).toBe(mockedUrl);
            expect(msgRelaySignInGlobalMock.toURL).toHaveBeenCalledWith("url");
        });
    });

    describe("parseFullAccessKeyRequest", () => {
        it("should throw an error if the MsgFakSign fails", () => {
            const expectedError = new Error("mockError");
            msgFakSignStaticGlobalMock.fromURL.mockImplementation(() => {
                throw expectedError;
            });

            const walletClient = new WalletClient({ signingURL: "url" });

            expect(() => walletClient.parseFullAccessKeyRequest("url")).toThrow(expectedError);
        });

        it("should return the signed transaction and redirect URL", () => {
            const mockedTransaction = new TransactionMock();
            const mockedRedirectURL = "mockedRedirectURL";
            const mockedUrl = "mockedUrl";

            msgFakSignStaticGlobalMock.fromURL.mockReturnValue({
                transaction: mockedTransaction,
                redirectURL: mockedRedirectURL,
            });

            const walletClient = new WalletClient({ signingURL: "url" });

            expect(walletClient.parseFullAccessKeyRequest(mockedUrl)).toEqual({
                transaction: mockedTransaction,
                redirectURL: mockedRedirectURL,
            });
            expect(msgFakSignStaticGlobalMock.fromURL).toHaveBeenCalledWith(mockedUrl);
        });
    });
});
