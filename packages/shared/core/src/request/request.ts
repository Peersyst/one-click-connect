export enum RequestType {
    SIGN_IN = "sign-in",
    ADD_LAK = "add-lak",
    SIGN_WITH_FAK = "sign-with-fak",
}

export type Request<Type extends RequestType, Params> = {
    type: Type;
    params: Params;
};
