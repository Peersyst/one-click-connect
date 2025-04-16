export class RepositoryError extends Error {
    constructor(repositoryName: string, message: string) {
        super(`${repositoryName}: ${message}`);
    }
}
