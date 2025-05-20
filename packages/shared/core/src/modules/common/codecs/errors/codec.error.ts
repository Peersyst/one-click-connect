import { CodecType } from "../types";

export class CodecError extends Error {
    constructor(type: CodecType, message: string) {
        super(`${type}: ${message}`);
    }
}
