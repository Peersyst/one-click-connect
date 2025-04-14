import { MsgErrorCodes } from ".";

export class MsgError extends Error {
    constructor(public readonly code: MsgErrorCodes) {
        super(code);
    }
}
