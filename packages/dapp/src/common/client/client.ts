import { DAppClientConfig } from "../config";
import { IUserService } from "./interfaces/i-user.service";

export abstract class DAppClient<TConfig extends DAppClientConfig> {
    protected userService: IUserService;
    protected config: TConfig;

    constructor(config: TConfig, userService: IUserService) {
        this.userService = userService;
        this.config = config;
    }
}
