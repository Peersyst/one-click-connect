import { createGlobalMock, MethodMock } from "@shared/test";
import { NearDAppClient } from "@one-click-connect/dapp-core";

export const ClientGlobalMock = createGlobalMock(NearDAppClient, {
    requestSignInitialTx: new MethodMock("mockReturnValue", "requestSignInitialTxUrl"),
    requestSignWithFullAccessKey: new MethodMock("mockReturnValue", "requestSignWithFullAccessKeyUrl"),
    getActiveAccount: new MethodMock("mockReturnValue", "activeAccount"),
    isSignedIn: new MethodMock("mockReturnValue", false),
    signOut: new MethodMock("mockReturnValue"),
    getConfig: new MethodMock("mockReturnValue", {
        redirectURL: "redirectURL",
    }),
});
