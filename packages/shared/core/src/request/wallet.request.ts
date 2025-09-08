import { Request, RequestType } from "./request";

export type SignInRequest = Request<
    RequestType.SIGN_IN,
    {
        accountID: string;
        walletId?: string;
        accessKey?: string;
    }
>;

export type WalletRequest = SignInRequest;
