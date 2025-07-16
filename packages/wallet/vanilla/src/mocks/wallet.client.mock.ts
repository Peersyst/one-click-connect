import { createMock, MethodMock } from "@shared/test";
import { WalletClient } from "../../src/client";
import { FunctionCallPermissionMock } from "./function-call-permission.mock";
import { PublicKeyMock } from "./public-key.mock";
import { TransactionMock } from "./transaction.mock";
import { RelayerAPIMock } from "./relayer-api.mock";

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
