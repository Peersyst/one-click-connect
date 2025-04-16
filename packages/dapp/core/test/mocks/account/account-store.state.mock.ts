import { mockify } from "@shared/test";
import { AccountStoreState } from "../../../src/common/account/states";

export const AccountStoreStateMock = mockify<AccountStoreState>({
    active: "mockAccountID",
    accounts: {},
});
