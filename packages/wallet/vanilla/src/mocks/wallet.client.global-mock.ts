import { createGlobalMock, MethodMock } from "@shared/test";
import { WalletClient } from "../../src/client/wallet.client";
import { TransactionMock } from "./transaction.mock";

export const WalletClientGlobalMock = createGlobalMock(WalletClient, {
    requestSignIn: new MethodMock("mockReturnValue", "signInUrl"),
    parseFullAccessKeyRequest: new MethodMock("mockReturnValue", {
        transaction: new TransactionMock(),
        redirectURL: "redirectURL",
    }),
    getConfig: new MethodMock("mockReturnValue", {
        signingURL: "signingURL",
        relayerAPI: "relayerAPI",
    }),
});
