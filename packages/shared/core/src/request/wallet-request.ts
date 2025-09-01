export type WalletRequestType = "sign-in";

export type SignInParams = {
    accountID: string;
    walletId?: string;
    accessKey?: string;
};

export type WalletRequestParams = SignInParams;

export type WalletRequest = {
    type: WalletRequestType;
    params: WalletRequestParams;
};
