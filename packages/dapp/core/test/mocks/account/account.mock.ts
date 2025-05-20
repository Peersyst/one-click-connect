import { mockify } from "@shared/test";
import { Account } from "../../../src/common/account/account.types";
import { KeyPairMock } from "@one-click-connect/core/mocks";

export const AccountMock = mockify<Account>({
    accountID: "mockAccountID",
    keypair: new KeyPairMock(),
});
