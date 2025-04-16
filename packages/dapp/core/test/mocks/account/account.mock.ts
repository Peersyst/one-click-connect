import { mockify } from "@shared/test";
import { Account } from "../../../src/common/account/account.types";
import { KeyPairMock } from "../near/keypair-ed25519";

export const AccountMock = mockify<Account>({
    accountID: "mockAccountID",
    keypair: new KeyPairMock(),
});
