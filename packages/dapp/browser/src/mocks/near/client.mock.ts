import { createMock, MethodMock } from "@shared/test";
import { Client } from "../../clients";

export const ClientMock = createMock<Client>({
    requestSignInitialTx: new MethodMock("mockReturnValue", "requestSignInitialTxUrl"),
    requestSignWithFullAccessKey: new MethodMock("mockReturnValue", "requestSignWithFullAccessKeyUrl"),
    getActiveAccount: new MethodMock("mockReturnValue", "activeAccount"),
    isSignedIn: new MethodMock("mockReturnValue", false),
    signOut: new MethodMock("mockReturnValue"),
    getConfig: new MethodMock("mockReturnValue", {
        redirectURL: "redirectURL",
    }),
});
