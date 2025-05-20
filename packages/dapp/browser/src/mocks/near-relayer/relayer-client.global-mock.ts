import { NearRelayerDAppClient } from "@one-click-connect/dapp-core/clients";
import { createGlobalMock, MethodMock } from "@shared/test";

export const RelayerClientGlobalMock = createGlobalMock(NearRelayerDAppClient, {
    requestSignInitialTx: new MethodMock("mockReturnValue", "requestSignInitialTxUrl"),
    requestSignWithFullAccessKey: new MethodMock("mockReturnValue", "requestSignWithFullAccessKeyUrl"),
    getActiveAccount: new MethodMock("mockReturnValue", "activeAccount"),
    isSignedIn: new MethodMock("mockReturnValue", false),
    signOut: new MethodMock("mockReturnValue"),
    getConfig: new MethodMock("mockReturnValue", {
        redirectURL: "redirectURL",
    }),
});
