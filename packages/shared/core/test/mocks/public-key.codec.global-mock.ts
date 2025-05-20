import { createGlobalMock, MethodMock } from "@shared/test";
import { PublicKeyCodec } from "../../src/modules/common/codecs";
import { PublicKey } from "near-api-js/lib/utils";

export const PublicKeyCodecGlobalMock = createGlobalMock(PublicKeyCodec, {
    fromURLParam: new MethodMock("mockReturnValue", PublicKey.fromString("ed25519:DYJYJT26BZVStUV9vm3rBY2gu812wTQwVFyk9Y4XcQf1")),
    toURLParam: new MethodMock("mockReturnValue", "mockEncodedPublicKey"),
});
