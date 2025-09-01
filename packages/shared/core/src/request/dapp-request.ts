import { FunctionCallPermission } from "near-api-js/lib/transaction";
import { PublicKey } from "near-api-js/lib/utils";

export type DAppRequestType = "add-lak" | "sign-with-fak";

export type AddLAKParams = {
    redirectURL: string;
    permissions: FunctionCallPermission;
    publicKey: PublicKey;
};
export type SignWithFAKParams = {
    // TODO: Remove this any type
    transactions: any[];
    redirectURL: string;
};
export type DAppRequestParams = AddLAKParams | SignWithFAKParams;

export type DAppRequest = {
    type: DAppRequestType;
    params: DAppRequestParams;
};
