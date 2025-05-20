import { MsgFakSignGlobalMock, RelayerAPIMock } from "@one-click-connect/core/mocks";
import { MsgSignInitialTxGlobalMock } from "@one-click-connect/core/mocks";
import { NearRelayerDAppClient } from "../../src";
import { NearRelayerDAppClientConfig } from "../../src/clients/relayer/relayer.client.config";
import { AccountServiceMock } from "../mocks/account/account.service.mock";
import { ClientErrorCodes } from "../../src/common/client/errors";
import { KeyPairMock, TransactionMock } from "@one-click-connect/core/mocks";

describe("NearRelayerDAppClient", () => {
    let client: NearRelayerDAppClient<NearRelayerDAppClientConfig>;

    const accountService = new AccountServiceMock();
    const msgSignInitialTxGlobalMock = new MsgSignInitialTxGlobalMock();
    const msgFakSignGlobalMock = new MsgFakSignGlobalMock();

    beforeEach(() => {
        client = new NearRelayerDAppClient(
            {
                redirectURL: "https://example.com",
                relayerAPI: new RelayerAPIMock(),
            },
            accountService,
        );

        accountService.clearMocks();
    });

    describe("isSignedIn", () => {
        const mockAccountID = "mockAccountID";
        const mockSigningURL = "https://signing-url.com";
        const mockRelayerAPI = new RelayerAPIMock();

        it("should return true if account is already active", () => {
            accountService.getActive.mockReturnValue({ accountID: mockAccountID });

            const result = client.isSignedIn(mockAccountID, mockSigningURL, mockRelayerAPI);

            expect(result).toBe(true);
            expect(accountService.getAccount).not.toHaveBeenCalled();
        });

        it("should return false if account does not exist", () => {
            accountService.getActive.mockReturnValue(undefined);
            accountService.getAccount.mockReturnValue(undefined);

            const result = client.isSignedIn(mockAccountID, mockSigningURL, mockRelayerAPI);

            expect(result).toBe(false);
            expect(accountService.getAccount).toHaveBeenCalledWith(mockAccountID);
        });

        it("should update signing URL and relayer API if different from stored values", () => {
            const storedSigningURL = "https://old-url.com";
            const storedRelayerAPI = "https://old-relayer-api.com";
            accountService.getActive.mockReturnValue(undefined);
            accountService.getAccount.mockReturnValue({
                signingURL: storedSigningURL,
                relayerAPI: storedRelayerAPI,
            });

            const result = client.isSignedIn(mockAccountID, mockSigningURL, mockRelayerAPI);

            expect(result).toBe(true);
            expect(accountService.updateAccount).toHaveBeenCalledWith(mockAccountID, mockSigningURL, mockRelayerAPI);
            expect(accountService.setActive).toHaveBeenCalledWith(mockAccountID);
        });

        it("should not update account if values are the same", () => {
            accountService.getActive.mockReturnValue(undefined);
            accountService.getAccount.mockReturnValue({
                signingURL: mockSigningURL,
                relayerAPI: mockRelayerAPI,
            });

            const result = client.isSignedIn(mockAccountID, mockSigningURL, mockRelayerAPI);

            expect(result).toBe(true);
            expect(accountService.updateAccount).not.toHaveBeenCalled();
            expect(accountService.setActive).toHaveBeenCalledWith(mockAccountID);
        });
    });

    describe("getActiveAccount", () => {
        it("should return the active account", () => {
            const mockAccount = { accountID: "mockAccountID" };
            accountService.getActive.mockReturnValue(mockAccount);

            const result = client.getActiveAccount();

            expect(result).toEqual(mockAccount);
            expect(accountService.getActive).toHaveBeenCalled();
        });

        it("should return undefined if no active account", () => {
            accountService.getActive.mockReturnValue(undefined);

            const result = client.getActiveAccount();

            expect(result).toBeUndefined();
            expect(accountService.getActive).toHaveBeenCalled();
        });
    });

    describe("signOut", () => {
        it("should clear the active account", () => {
            client.signOut();

            expect(accountService.clearActiveAccount).toHaveBeenCalled();
        });
    });

    describe("signInitialTx", () => {
        const mockAccountID = "mockAccountID";
        const mockSigningURL = "https://signing-url.com";

        it("should throw an error if the redirect URL is not set", () => {
            // @ts-ignore
            client = new NearRelayerDAppClient({ redirectURL: undefined, relayerAPI: "https://relayer-api.com" }, accountService);

            expect(() =>
                client.requestSignInitialTx({
                    accountID: mockAccountID,
                    signingURL: mockSigningURL,
                    permissions: [],
                }),
            ).toThrow(ClientErrorCodes.REDIRECT_URL_NOT_SET);
        });

        it("should throw an error if the relayer API is not set", () => {
            // @ts-ignore
            client = new NearRelayerDAppClient({ redirectURL: "https://example.com", relayerAPI: undefined }, accountService);

            expect(() =>
                client.requestSignInitialTx({
                    accountID: mockAccountID,
                    signingURL: mockSigningURL,
                    permissions: [],
                }),
            ).toThrow(ClientErrorCodes.RELAYER_API_NOT_SET);
        });

        it("should throw an error if the account already exists", () => {
            accountService.getAccount.mockReturnValue({ keypair: new KeyPairMock() });

            expect(() =>
                client.requestSignInitialTx({
                    accountID: mockAccountID,
                    signingURL: mockSigningURL,
                    permissions: [],
                }),
            ).toThrow(ClientErrorCodes.ACCOUNT_ALREADY_EXISTS);
        });

        it("should create a new account if the account does not exists", () => {
            const expectedURL = "mockURL";

            accountService.getAccount.mockReturnValue(undefined);
            accountService.createAccount.mockReturnValue({ keypair: new KeyPairMock() });
            msgSignInitialTxGlobalMock.toURL.mockReturnValue(expectedURL);

            const url = client.requestSignInitialTx({
                accountID: mockAccountID,
                signingURL: mockSigningURL,
                permissions: [],
            });

            expect(accountService.getAccount).toHaveBeenCalledWith(mockAccountID);
            expect(accountService.createAccount).toHaveBeenCalledWith(mockAccountID, mockSigningURL, client.getConfig().relayerAPI);
            expect(url).toEqual(expectedURL);
        });

        it("should throw an error if the MsgSignInitialTx fails", () => {
            const expectedError = new Error("mockError");
            msgSignInitialTxGlobalMock.toURL.mockImplementation(() => {
                throw expectedError;
            });

            expect(() =>
                client.requestSignInitialTx({
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
            client = new NearRelayerDAppClient({ redirectURL: undefined, relayerAPI: "https://relayer-api.com" }, accountService);

            expect(() => client.requestSignWithFullAccessKey({ transaction, signingURL: "https://example.com" })).toThrow(
                ClientErrorCodes.REDIRECT_URL_NOT_SET,
            );
        });

        it("should throw an error if the MsgFakSign fails", () => {
            const expectedError = new Error("mockError");
            msgFakSignGlobalMock.toURL.mockImplementation(() => {
                throw expectedError;
            });

            expect(() => client.requestSignWithFullAccessKey({ transaction, signingURL: "https://example.com" })).toThrow(expectedError);
        });

        it("should return the url to sign the full access key transaction", () => {
            const expectedURL = "mockURL";
            msgFakSignGlobalMock.toURL.mockReturnValue(expectedURL);

            const url = client.requestSignWithFullAccessKey({ transaction, signingURL: "https://example.com" });

            expect(url).toEqual(expectedURL);
        });
    });

    describe("getConfig", () => {
        it("should return the client configuration", () => {
            const config = client.getConfig();

            expect(config).toEqual({
                redirectURL: "https://example.com",
                relayerAPI: new RelayerAPIMock(),
            });
        });
    });
});
