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

        it("should throw error if repository throws", () => {
            const expectedError = new Error("Repository error");
            accountRepositoryMock.getActive.mockImplementation(() => {
                throw expectedError;
            });

            expect(() => accountService.getActive()).toThrow(expectedError);
        });
    });

    describe("setActive", () => {
        it("should set the active account", () => {
            accountService.setActive("mockAccountID");

            expect(accountRepositoryMock.setActive).toHaveBeenCalledWith("mockAccountID");
        });

        it("should throw error if repository throws", () => {
            const expectedError = new Error("Repository error");
            accountRepositoryMock.setActive.mockImplementationOnce(() => {
                throw expectedError;
            });

            expect(() => accountService.setActive("mockAccountID")).toThrow(expectedError);
        });
    });

    describe("clearActiveAccount", () => {
        it("should clear the active account", () => {
            accountService.clearActiveAccount();

            expect(accountRepositoryMock.setActive).toHaveBeenCalledWith(undefined);
        });

        it("should throw error if repository throws", () => {
            const expectedError = new Error("Repository error");
            accountRepositoryMock.setActive.mockImplementationOnce(() => {
                throw expectedError;
            });

            expect(() => accountService.clearActiveAccount()).toThrow(expectedError);
        });
    });

    describe("getAccount", () => {
        it("should return the account keypair if it exists", () => {
            accountService.getAccount("mockAccountID");

            expect(accountRepositoryMock.get).toHaveBeenCalledWith("mockAccountID");
        });

        it("should throw error if repository throws", () => {
            const expectedError = new Error("Repository error");
            accountRepositoryMock.get.mockImplementationOnce(() => {
                throw expectedError;
            });

            expect(() => accountService.getAccount("mockAccountID")).toThrow(expectedError);
        });
    });

    describe("createAccount", () => {
        it("should create a new account keypair", () => {
            accountService.createAccount("mockAccountID", "mockSigningURL");

            expect(accountRepositoryMock.create).toHaveBeenCalled();
            expect(accountRepositoryMock.setActive).toHaveBeenCalledWith("mockAccountID");
        });

        it("should throw error if repository throws", () => {
            const expectedError = new Error("Repository error");
            accountRepositoryMock.create.mockImplementationOnce(() => {
                throw expectedError;
            });

            expect(() => accountService.createAccount("mockAccountID", "mockSigningURL")).toThrow(expectedError);
        });
    });

    describe("deleteAccount", () => {
        it("should delete the account keypair", () => {
            accountService.deleteAccount("mockAccountID");

            expect(accountRepositoryMock.delete).toHaveBeenCalledWith("mockAccountID");
        });

        it("should throw error if repository throws", () => {
            const expectedError = new Error("Repository error");
            accountRepositoryMock.delete.mockImplementationOnce(() => {
                throw expectedError;
            });

            expect(() => accountService.deleteAccount("mockAccountID")).toThrow(expectedError);
        });
    });

    describe("updateAccount", () => {
        it("should update the account keypair", () => {
            accountService.updateAccount("mockAccountID", "mockSigningURL");

            expect(accountRepositoryMock.update).toHaveBeenCalledWith("mockAccountID", "mockSigningURL");
        });

        it("should throw error if repository throws", () => {
            const expectedError = new Error("Repository error");
            accountRepositoryMock.update.mockImplementationOnce(() => {
                throw expectedError;
            });

            expect(() => accountService.updateAccount("mockAccountID", "mockSigningURL")).toThrow(expectedError);
        });
    });
});
