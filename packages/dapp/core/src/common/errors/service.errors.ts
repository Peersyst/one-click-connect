export class ServiceError extends Error {
    constructor(serviceName: string, message: string) {
        super(`${serviceName}: ${message}`);
    }
}
