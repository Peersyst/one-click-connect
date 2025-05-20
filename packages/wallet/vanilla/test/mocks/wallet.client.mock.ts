import { createMock, MethodMock } from "@shared/test";
import { WalletClient } from "../../src/client";
import { TransactionMock } from "@one-click-connect/core/mocks";

export const WalletClientMock = createMock<WalletClient>({
    signIn: new MethodMock("mockReturnValue", "signInUrl"),
    signWithFullAccessKey: new MethodMock("mockReturnValue", {
        transaction: new TransactionMock(),
        redirectURL: "redirectURL",
    }),
    getConfig: new MethodMock("mockReturnValue", {
        signingURL: "signingURL",
        relayerAPI: "relayerAPI",
    }),
});
