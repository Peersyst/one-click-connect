import { NearDAppClientConfig } from "../base";
import { RelayerAPI } from "@one-click-connect/core";

export type NearRelayerDAppClientConfig = {
    relayerAPI?: RelayerAPI;
} & NearDAppClientConfig;
