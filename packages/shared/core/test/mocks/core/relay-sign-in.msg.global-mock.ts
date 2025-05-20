import { createGlobalMock, MethodMock } from "@shared/test";
import { MsgRelaySignIn } from "../../../src/modules";

export const MsgRelaySignInGlobalMock = createGlobalMock<MsgRelaySignIn>(MsgRelaySignIn.prototype, {
    toURL: new MethodMock("mockReturnValue", "url"),
});
