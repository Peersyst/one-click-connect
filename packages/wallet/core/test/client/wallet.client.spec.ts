import { WalletClient } from "../../src/client/wallet.client";
import { ClientErrorCodes } from "../../src/common/errors";
import { MsgFakSignStaticGlobalMock, TransactionMock, MsgSignInGlobalMock } from "@one-click-connect/core/mocks";

describe("WalletClient", () => {
    const msgSignInGlobalMock = new MsgSignInGlobalMock();
    const msgFakSignStaticGlobalMock = new MsgFakSignStaticGlobalMock();

    beforeEach(() => {
        msgSignInGlobalMock.clearMocks();
        msgFakSignStaticGlobalMock.clearMocks();
    });

    describe("signIn", () => {
        it("should throw an error if the signing URL is not set", () => {
            const walletClient = new WalletClient({ signingURL: "" });
            expect(() => walletClient.signIn("accountID", "url")).toThrow(ClientErrorCodes.SIGNING_URL_NOT_SET);
        });

        it("should return the signed in URL", () => {
            const mockedUrl = "mockedUrl";
            msgSignInGlobalMock.toURL.mockReturnValue(mockedUrl);

            const walletClient = new WalletClient({ signingURL: "url" });

            expect(walletClient.signIn("accountID", "url")).toBe(mockedUrl);
        });
    });

    describe("signWithFullAccessKey", () => {
        it("should throw an error if the MsgFakSign fails", () => {
            const expectedError = new Error("mockError");
            msgFakSignStaticGlobalMock.fromURL.mockImplementation(() => {
                throw expectedError;
            });

            const walletClient = new WalletClient({ signingURL: "url" });

            expect(() => walletClient.signWithFullAccessKey("url")).toThrow(expectedError);
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

            expect(walletClient.signWithFullAccessKey(mockedUrl)).toEqual({
                transaction: mockedTransaction,
                redirectURL: mockedRedirectURL,
            });
            expect(msgFakSignStaticGlobalMock.fromURL).toHaveBeenCalledWith(mockedUrl);
        });
    });
});
