import { NearRelayerDAppClient as CoreNearRelayerDAppClient } from "@one-click-connect/dapp-core/clients";
import { RelayerClientConfig } from "./relayer.client.config";

export type RelayerClient = CoreNearRelayerDAppClient<RelayerClientConfig>;
