import { MsgFakSign } from "@one-click-connect/core/base";
import { createGlobalMock, MethodMock } from "@shared/test";
import { TransactionMock } from "../near";

export const MsgFakSignGlobalMock = createGlobalMock(MsgFakSign.prototype, {
    toURL: new MethodMock("mockReturnValue", "mockURL"),
    _transaction: new TransactionMock(),
    transaction: new TransactionMock(),
});

export const MsgFakSignStaticGlobalMock = createGlobalMock(MsgFakSign, {
    fromURL: new MethodMock("mockReturnValue", {
        transaction: new TransactionMock(),
        redirectURL: "mockRedirectURL",
    }),
});
