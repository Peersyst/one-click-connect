import { createGlobalMock, MethodMock } from "@shared/test";
import { MsgSignIn } from "../../../src";

export const MsgSignInGlobalMock = createGlobalMock(MsgSignIn.prototype, {
    toURL: new MethodMock("mockReturnValue", "url"),
});
