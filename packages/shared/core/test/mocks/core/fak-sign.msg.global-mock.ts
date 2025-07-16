import { MsgFakSign } from "@one-click-connect/core";
import { createGlobalMock, MethodMock } from "@shared/test";
import { TransactionMock } from "../near";

export const MsgFakSignGlobalMock = createGlobalMock(MsgFakSign.prototype, {
    toURL: new MethodMock("mockReturnValue", "mockURL"),
});

export const MsgFakSignStaticGlobalMock = createGlobalMock(MsgFakSign, {
    fromURL: new MethodMock("mockReturnValue", {
        transaction: new TransactionMock(),
        redirectURL: "mockRedirectURL",
    }),
});
