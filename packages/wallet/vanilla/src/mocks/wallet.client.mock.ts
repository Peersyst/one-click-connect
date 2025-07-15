import { createMock, MethodMock } from "@shared/test";
import { WalletClient } from "../../src/client";
import { FunctionCallPermissionMock, PublicKeyMock, RelayerAPIMock, TransactionMock } from "@one-click-connect/core";

export const WalletClientMock = createMock<WalletClient>({
    requestSignIn: new MethodMock("mockReturnValue", "signInUrl"),
    parseSignInitialTxRequest: new MethodMock("mockReturnValue", {
        permission: new FunctionCallPermissionMock(),
        publicKey: new PublicKeyMock(),
        redirectURL: "redirectURL",
    }),
    parseFullAccessKeyRequest: new MethodMock("mockReturnValue", {
        transaction: new TransactionMock(),
        redirectURL: "redirectURL",
    }),
    getConfig: new MethodMock("mockReturnValue", {
        signingURL: "signingURL",
        relayerAPI: new RelayerAPIMock(),
    }),
});
