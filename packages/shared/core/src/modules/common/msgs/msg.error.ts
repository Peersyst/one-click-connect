import { MsgErrorCodes } from ".";

/**
 * Error class for messages.
 */
export class MsgError extends Error {
    /**
     * Constructor for the MsgError class.
     * @param code The error code.
     */
    constructor(readonly code: MsgErrorCodes) {
        super(code);
    }
}
