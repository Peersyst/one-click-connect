import { createGlobalMock, MethodMock } from "@shared/test";
import { MsgSignInitialTx } from "@one-click-connect/core/base";
import { PublicKeyMock, TransactionMock } from "../near";

export const MsgSignInitialTxGlobalMock = createGlobalMock(MsgSignInitialTx.prototype, {
    toURL: new MethodMock("mockReturnValue", "mockURL"),
    _transaction: new TransactionMock(),
    _publicKey: new PublicKeyMock(),
    transaction: new TransactionMock(),
    publicKey: new PublicKeyMock(),
});
