import { ClientErrorCodes } from ".";

export class ClientError extends Error {
    constructor(code: ClientErrorCodes) {
        super(code);
    }
}
