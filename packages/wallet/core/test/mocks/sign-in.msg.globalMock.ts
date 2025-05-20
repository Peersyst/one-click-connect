import { MsgSignIn } from "@one-click-connect/core/base";
import { createGlobalMock, MethodMock } from "@shared/test";

export const MsgSignInGlobalMock = createGlobalMock(MsgSignIn.prototype, {
    toURL: new MethodMock("mockReturnValue", "url"),
});
