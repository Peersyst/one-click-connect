import { Permissions } from "../msg";
import { Request, RequestType } from ".";

export type AddLAKRequest = Request<
    RequestType.ADD_LAK,
    {
        redirectURL: string;
        permissions: Permissions;
        publicKey: string;
    }
>;

export type SignWithFAKRequest = Request<
    RequestType.SIGN_WITH_FAK,
    {
        // TODO: Remove this any type
        transactions: any[];
        redirectURL: string;
    }
>;

export type DAppRequest = AddLAKRequest | SignWithFAKRequest;
