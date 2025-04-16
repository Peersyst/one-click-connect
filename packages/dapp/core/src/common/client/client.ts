import { DAppClientConfig } from "../config";
import { IAccountService } from "./interfaces/i-account.service";

export abstract class DAppClient<TConfig extends DAppClientConfig> {
    protected config: TConfig;
    protected accountService: IAccountService;

    constructor(config: TConfig, accountService: IAccountService) {
        this.config = config;
        this.accountService = accountService;
    }

    abstract getConfig(): TConfig;
}
