import { createGlobalMock, MethodMock } from "@shared/test";
import { PermissionsCodec } from "../../../src/modules/common/codecs";

export const PermissionsCodecGlobalMock = createGlobalMock(PermissionsCodec, {
    fromURLParam: new MethodMock("mockReturnValue", { functionCall: { receiverId: "example.com" } }),
    toURLParam: new MethodMock("mockReturnValue", "mockEncodedPermissions"),
});
