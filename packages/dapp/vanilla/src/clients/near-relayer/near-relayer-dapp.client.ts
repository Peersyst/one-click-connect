import { NearRelayerDAppClient as CoreNearRelayerDAppClient } from "@one-click-connect/dapp-core/clients";
import { NearRelayerDAppClientConfig } from "./near-relayer-dapp.client.config";

export type NearRelayerDAppClient = CoreNearRelayerDAppClient<NearRelayerDAppClientConfig>;
