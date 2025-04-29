import { createMock, MethodMock } from "@shared/test";
import { IAccountService } from "../../../src/common/client/interfaces/i-account.service";
import { AccountMock } from "./account.mock";

export const AccountServiceMock = createMock<IAccountService>({
    getActive: new MethodMock("mockReturnValue"),
    getAccount: new MethodMock("mockReturnValue", new AccountMock()),
    createAccount: new MethodMock("mockReturnValue", new AccountMock()),
    deleteAccount: new MethodMock("mockReturnValue"),
    updateAccount: new MethodMock("mockReturnValue"),
    setActive: new MethodMock("mockReturnValue"),
    clearActiveAccount: new MethodMock("mockReturnValue"),
});
