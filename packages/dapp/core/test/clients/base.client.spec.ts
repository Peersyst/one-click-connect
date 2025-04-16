import { NearDAppClient, NearDAppClientConfig } from "../../src/clients";
import { ClientErrorCodes } from "../../src/common/client/errors";
import { AccountServiceMock } from "../mocks/account/account.service.mock";
import { MsgSignInitialTxGlobalMock } from "../mocks/core/sign-initial-tx.msg.globalMock";
import { KeyPairMock } from "../mocks/near/keypair-ed25519";

describe("NearDAppClient", () => {
    let client: NearDAppClient<NearDAppClientConfig>;

    const accountService = new AccountServiceMock();
    const msgSignInitialTxGlobalMock = new MsgSignInitialTxGlobalMock();

    beforeEach(() => {
        client = new NearDAppClient({ redirectURL: "https://example.com" }, accountService);

        accountService.clearMocks();
    });

    describe("signInitialTx", () => {
        it("should throw an error if the account already exists", () => {
            accountService.getAccountKeypair.mockReturnValue({ keypair: new KeyPairMock() });

            expect(() =>
                client.signInitialTx({
                    accountID: "mockAccountID",
                    signingURL: "https://example.com",
                    permissions: [],
                }),
            ).toThrow(ClientErrorCodes.ACCOUNT_ALREADY_EXISTS);
        });

        it("should create a new account if the account does not exists", () => {
            const expectedURL = "mockURL";

            accountService.getAccountKeypair.mockReturnValue(undefined);
            accountService.createAccountKeypair.mockReturnValue({ keypair: new KeyPairMock() });
            msgSignInitialTxGlobalMock.toURL.mockReturnValue(expectedURL);

            const url = client.signInitialTx({
                accountID: "mockAccountID",
                signingURL: "https://example.com",
                permissions: [],
            });

            expect(accountService.getAccountKeypair).toHaveBeenCalledWith("mockAccountID");
            expect(accountService.createAccountKeypair).toHaveBeenCalledWith("mockAccountID");

            expect(url).toEqual(expectedURL);
        });

        it("should throw an error if the MsgSignInitialTx fails", () => {
            const expectedError = new Error("mockError");
            msgSignInitialTxGlobalMock.toURL.mockImplementation(() => {
                throw expectedError;
            });

            expect(() =>
                client.signInitialTx({
                    accountID: "mockAccountID",
                    signingURL: "https://example.com",
                    permissions: [],
                }),
            ).toThrow(expectedError);
        });
    });
});
