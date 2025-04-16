import { WalletClient } from "../../src/client/wallet.client";
import { ClientErrorCodes } from "../../src/common/errors";
import { MsgSignInGlobalMock } from "../mocks/sign-in.msg.globalMock";

describe("WalletClient", () => {
    let msgSignInGlobalMock = new MsgSignInGlobalMock();

    beforeEach(() => {
        msgSignInGlobalMock.clearMocks();
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
});
