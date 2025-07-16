import { RelayerAPI } from "@one-click-connect/core";
import { mockify } from "@shared/test";

export const RelayerAPIMock = mockify<RelayerAPI>({
    url: "https://relayer.com",
});
