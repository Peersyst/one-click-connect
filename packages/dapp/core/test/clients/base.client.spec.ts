import { NearDAppClient, NearDAppClientConfig } from "../../src/clients";
import { ClientErrorCodes } from "../../src/common/client/errors";
import { AccountServiceMock } from "../mocks/account/account.service.mock";
import {
    MsgFakSignGlobalMock,
    MsgSignInitialTxGlobalMock,
    KeyPairMock,
    TransactionMock,
    FunctionCallPermissionMock,
} from "@one-click-connect/core/mocks";

describe("NearDAppClient", () => {
    let client: NearDAppClient<NearDAppClientConfig>;

    const accountService = new AccountServiceMock();
    const msgSignInitialTxGlobalMock = new MsgSignInitialTxGlobalMock();
    const msgFakSignGlobalMock = new MsgFakSignGlobalMock();

    const mockPermissions = new FunctionCallPermissionMock();

    beforeEach(() => {
        client = new NearDAppClient({ redirectURL: "https://example.com" }, accountService);

        accountService.clearMocks();
    });

    describe("isSignedIn", () => {
        const mockAccountID = "mockAccountID";
        const mockSigningURL = "https://signing-url.com";

        it("should return true if account is already active", () => {
            accountService.getActive.mockReturnValue({ accountID: mockAccountID });

            const result = client.isSignedIn(mockAccountID, mockSigningURL);

            expect(result).toBe(true);
            expect(accountService.getAccount).not.toHaveBeenCalled();
        });

        it("should return false if account does not exist", () => {
            accountService.getActive.mockReturnValue(undefined);
            accountService.getAccount.mockReturnValue(undefined);

            const result = client.isSignedIn(mockAccountID, mockSigningURL);

            expect(result).toBe(false);
            expect(accountService.getAccount).toHaveBeenCalledWith(mockAccountID);
        });

        it("should update signing URL if different from stored URL", () => {
            const storedSigningURL = "https://old-url.com";
            accountService.getActive.mockReturnValue(undefined);
            accountService.getAccount.mockReturnValue({ signingURL: storedSigningURL });

            const result = client.isSignedIn(mockAccountID, mockSigningURL);

            expect(result).toBe(true);
            expect(accountService.updateAccount).toHaveBeenCalledWith(mockAccountID, mockSigningURL);
            expect(accountService.setActive).toHaveBeenCalledWith(mockAccountID);
        });

        it("should not update signing URL if same as stored URL", () => {
            accountService.getActive.mockReturnValue(undefined);
            accountService.getAccount.mockReturnValue({ signingURL: mockSigningURL });

            const result = client.isSignedIn(mockAccountID, mockSigningURL);

            expect(result).toBe(true);
            expect(accountService.updateAccount).not.toHaveBeenCalled();
            expect(accountService.setActive).toHaveBeenCalledWith(mockAccountID);
        });
    });

    describe("requestSignInitialTx", () => {
        const mockAccountID = "mockAccountID";
        const mockSigningURL = "https://signing-url.com";

        it("should throw an error if the account already exists", () => {
            accountService.getAccount.mockReturnValue({ keypair: new KeyPairMock() });

            expect(() =>
                client.requestSignInitialTx({
                    accountID: mockAccountID,
                    signingURL: mockSigningURL,
                    permissions: mockPermissions,
                }),
            ).toThrow(ClientErrorCodes.ACCOUNT_ALREADY_EXISTS);
        });

        it("should throw an error if the redirect URL is not set", () => {
            // @ts-ignore
            client = new NearDAppClient({ redirectURL: undefined }, accountService);

            expect(() =>
                client.requestSignInitialTx({
                    accountID: mockAccountID,
                    signingURL: mockSigningURL,
                    permissions: mockPermissions,
                }),
            ).toThrow(ClientErrorCodes.REDIRECT_URL_NOT_SET);
        });

        it("should create a new account if the account does not exists", () => {
            const expectedURL = "mockURL";

            accountService.getAccount.mockReturnValue(undefined);
            accountService.createAccount.mockReturnValue({ keypair: new KeyPairMock() });
            msgSignInitialTxGlobalMock.toURL.mockReturnValue(expectedURL);

            const url = client.requestSignInitialTx({
                accountID: mockAccountID,
                signingURL: mockSigningURL,
                permissions: mockPermissions,
            });

            expect(accountService.getAccount).toHaveBeenCalledWith(mockAccountID);
            expect(accountService.createAccount).toHaveBeenCalledWith(mockAccountID, mockSigningURL);

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
                    permissions: mockPermissions,
                }),
            ).toThrow(expectedError);
        });
    });

    describe("requestSignWithFullAccessKey", () => {
        const transaction = new TransactionMock();

        it("should throw an error if the redirect URL is not set", () => {
            // @ts-ignore
            client = new NearDAppClient({ redirectURL: undefined }, accountService);

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

    describe("signOut", () => {
        it("should clear the active account", () => {
            client.signOut();

            expect(accountService.clearActiveAccount).toHaveBeenCalled();
        });
    });
});
