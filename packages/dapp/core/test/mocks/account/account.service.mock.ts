import { createMock, MethodMock } from "@shared/test";
import { IAccountService } from "../../../src/common/client/interfaces/i-account.service";
import { AccountMock } from "./account.mock";

export const AccountServiceMock = createMock<IAccountService>({
    getActive: new MethodMock("mockReturnValue"),
    getAccountKeypair: new MethodMock("mockReturnValue", new AccountMock()),
    createAccountKeypair: new MethodMock("mockReturnValue", new AccountMock()),
    deleteAccountKeypair: new MethodMock("mockReturnValue"),
    clearActiveAccount: new MethodMock("mockReturnValue"),
});
