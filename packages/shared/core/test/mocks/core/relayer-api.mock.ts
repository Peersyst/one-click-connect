import { mockify } from "@shared/test";
import { RelayerAPI } from "../../../src/modules/relayer/types";

export const RelayerAPIMock = mockify<RelayerAPI>({
    url: "https://relayer.com",
});
