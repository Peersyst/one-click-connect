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

export type SignWithFAKRequest<Transactions> = Request<
    RequestType.SIGN_WITH_FAK,
    {
        transactions: Transactions;
        redirectURL: string;
    }
>;

export type DAppRequest = AddLAKRequest | SignWithFAKRequest<unknown>;
