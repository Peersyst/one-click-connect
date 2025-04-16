import { FunctionCallPermission } from "near-api-js/lib/transaction";

export type SignInitialTxRequest = {
    accountID: string;
    signingURL: string;
    permissions: FunctionCallPermission;
};
