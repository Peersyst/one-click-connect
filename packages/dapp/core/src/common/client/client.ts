import { DAppClientConfig } from "../config";

export abstract class DAppClient<TConfig extends DAppClientConfig> {
    protected config: TConfig;

    constructor(config: TConfig) {
        this.config = config;
    }

    abstract getConfig(): TConfig;
}
