import { createMock, MethodMock } from "@shared/test";
import { AccountMock } from "./account.mock";
import { IAccountRepository } from "../../../src/common/client";

export const AccountRepositoryMock = createMock<IAccountRepository>({
    getActive: new MethodMock("mockReturnValue", new AccountMock()),
    get: new MethodMock("mockReturnValue", new AccountMock()),
    create: new MethodMock("mockReturnValue", new AccountMock()),
    update: new MethodMock("mockReturnValue"),
    delete: new MethodMock("mockReturnValue"),
    setActive: new MethodMock("mockReturnValue"),
});
