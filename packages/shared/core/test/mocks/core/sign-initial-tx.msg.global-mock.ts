import { createGlobalMock, MethodMock } from "@shared/test";
import { MsgSignInitialTx } from "@one-click-connect/core/base";
import { PublicKeyMock } from "../near/public-key.mock";
import { FunctionCallPermissionMock } from "../near/function-call-permission.mock";

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
