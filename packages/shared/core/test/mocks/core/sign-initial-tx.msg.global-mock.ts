import { createGlobalMock, MethodMock } from "@shared/test";
import { PublicKeyMock } from "../near/public-key.mock";
import { FunctionCallPermissionMock } from "../near/function-call-permission.mock";
import { MsgSignInitialTx } from "../../../src";

export const MsgSignInitialTxGlobalMock = createGlobalMock(MsgSignInitialTx.prototype, {
    toURL: new MethodMock("mockReturnValue", "mockURL"),
});

export const MsgSignInitialTxStaticGlobalMock = createGlobalMock(MsgSignInitialTx, {
    fromURL: new MethodMock("mockReturnValue", {
        permissions: new FunctionCallPermissionMock(),
        redirectURL: "mockRedirectURL",
        publicKey: new PublicKeyMock(),
    }),
});
