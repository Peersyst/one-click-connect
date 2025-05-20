import { NearDAppClient, NearDAppClientConfig } from "../../src/clients";
import { ClientErrorCodes } from "../../src/common/client/errors";
import { AccountServiceMock } from "../mocks/account/account.service.mock";
import { MsgFakSignGlobalMock } from "../mocks/core/fak-sign.msg.global-mock";
import { MsgSignInitialTxGlobalMock } from "../mocks/core/sign-initial-tx.msg.global-mock";
import { TransactionMock } from "../mocks/near";
import { KeyPairMock } from "../mocks/near/keypair-ed25519";

describe("NearDAppClient", () => {
    let client: NearDAppClient<NearDAppClientConfig>;

    const accountService = new AccountServiceMock();
    const msgSignInitialTxGlobalMock = new MsgSignInitialTxGlobalMock();
    const msgFakSignGlobalMock = new MsgFakSignGlobalMock();

    beforeEach(() => {
        client = new NearDAppClient({ redirectURL: "https://example.com" }, accountService);

        accountService.clearMocks();
    });

    describe("signInitialTx", () => {
        const mockSigningURL = "https://example.com";
        const mockAccountID = "mockAccountID";
        it("should throw an error if the account already exists", () => {
            accountService.getAccountKeypair.mockReturnValue({ keypair: new KeyPairMock() });

            expect(() =>
                client.signInitialTx({
                    accountID: mockAccountID,
                    signingURL: mockSigningURL,
                    permissions: [],
                }),
            ).toThrow(ClientErrorCodes.ACCOUNT_ALREADY_EXISTS);
        });

        it("should throw an error if the redirect URL is not set", () => {
            // @ts-ignore
            client = new NearDAppClient({ redirectURL: undefined }, accountService);

            expect(() => client.signInitialTx({ accountID: mockAccountID, signingURL: mockSigningURL, permissions: [] })).toThrow(
                ClientErrorCodes.REDIRECT_URL_NOT_SET,
            );
        });

        it("should create a new account if the account does not exists", () => {
            const expectedURL = "mockURL";

            accountService.getAccountKeypair.mockReturnValue(undefined);
            accountService.createAccountKeypair.mockReturnValue({ keypair: new KeyPairMock() });
            msgSignInitialTxGlobalMock.toURL.mockReturnValue(expectedURL);

            const url = client.signInitialTx({
                accountID: mockAccountID,
                signingURL: mockSigningURL,
                permissions: [],
            });

            expect(accountService.getAccountKeypair).toHaveBeenCalledWith(mockAccountID);
            expect(accountService.createAccountKeypair).toHaveBeenCalledWith(mockAccountID, mockSigningURL);

            expect(url).toEqual(expectedURL);
        });

        it("should throw an error if the MsgSignInitialTx fails", () => {
            const expectedError = new Error("mockError");
            msgSignInitialTxGlobalMock.toURL.mockImplementation(() => {
                throw expectedError;
            });

            expect(() =>
                client.signInitialTx({
                    accountID: mockAccountID,
                    signingURL: mockSigningURL,
                    permissions: [],
                }),
            ).toThrow(expectedError);
        });
    });

    describe("signWithFullAccessKey", () => {
        const transaction = new TransactionMock();

        it("should throw an error if the redirect URL is not set", () => {
            // @ts-ignore
            client = new NearDAppClient({ redirectURL: undefined }, accountService);

            expect(() => client.signWithFullAccessKey({ transaction, signingURL: "https://example.com" })).toThrow(
                ClientErrorCodes.REDIRECT_URL_NOT_SET,
            );
        });

        it("should throw an error if the MsgFakSign fails", () => {
            const expectedError = new Error("mockError");
            msgFakSignGlobalMock.toURL.mockImplementation(() => {
                throw expectedError;
            });

            expect(() => client.signWithFullAccessKey({ transaction, signingURL: "https://example.com" })).toThrow(expectedError);
        });

        it("should return the url to sign the full access key transaction", () => {
            const expectedURL = "mockURL";
            msgFakSignGlobalMock.toURL.mockReturnValue(expectedURL);

            const url = client.signWithFullAccessKey({ transaction, signingURL: "https://example.com" });

            expect(url).toEqual(expectedURL);
        });
    });
});
