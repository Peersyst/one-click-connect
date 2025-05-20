import { NearDAppClientConfig } from "../base";

export type NearRelayerDAppClientConfig = {
    relayerAPI?: string;
} & NearDAppClientConfig;
