import { createMock, MethodMock } from "@shared/test";
import { PublicKey } from "near-api-js/lib/utils";
import { PublicKeyMock } from "./public-key.mock";

export interface KeyPair {
    getPublicKey: () => PublicKey;
}

export const KeyPairMock = createMock<KeyPair>({
    getPublicKey: new MethodMock("mockReturnValue", new PublicKeyMock()),
});
