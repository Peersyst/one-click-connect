import { createGlobalMock, MethodMock } from "@shared/test";
import { TransactionMock } from "../near";
import { MsgFakSign } from "../../../src";

export const MsgFakSignGlobalMock = createGlobalMock(MsgFakSign.prototype, {
    toURL: new MethodMock("mockReturnValue", "mockURL"),
});

export const MsgFakSignStaticGlobalMock = createGlobalMock(MsgFakSign, {
    fromURL: new MethodMock("mockReturnValue", {
        transaction: new TransactionMock(),
        redirectURL: "mockRedirectURL",
    }),
});
