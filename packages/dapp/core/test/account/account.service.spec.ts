import { AccountService } from "../../src/common/account/account.service";
import { AccountRepositoryMock } from "../mocks/account";

describe("AccountService", () => {
    let accountService: AccountService;

    const accountRepositoryMock = new AccountRepositoryMock();

    beforeEach(() => {
        accountService = new AccountService(accountRepositoryMock);

        accountRepositoryMock.clearMocks();
    });

    describe("getActive", () => {
        it("should return the active account", () => {
            accountService.getActive();

            expect(accountRepositoryMock.getActive).toHaveBeenCalled();
        });
    });

    describe("getAccountKeypair", () => {
        it("should return the account keypair if it exists", () => {
            accountService.getAccountKeypair("mockAccountID");

            expect(accountRepositoryMock.get).toHaveBeenCalledWith("mockAccountID");
        });
    });

    describe("createAccountKeypair", () => {
        it("should create a new account keypair", () => {
            accountService.createAccountKeypair("mockAccountID");

            expect(accountRepositoryMock.create).toHaveBeenCalled();
            expect(accountRepositoryMock.setActive).toHaveBeenCalledWith("mockAccountID");
        });
    });

    describe("deleteAccountKeypair", () => {
        it("should delete the account keypair", () => {
            accountService.deleteAccountKeypair("mockAccountID");

            expect(accountRepositoryMock.delete).toHaveBeenCalledWith("mockAccountID");
        });
    });
});
