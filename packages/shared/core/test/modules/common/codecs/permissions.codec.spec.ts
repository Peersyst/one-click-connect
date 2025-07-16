import { PermissionsCodec } from "../../../../src/modules/common/codecs";
import { FunctionCallPermissionMock } from "../../../mocks";

describe("PermissionsCodec", () => {
    const mockPermissions = new FunctionCallPermissionMock({
        receiverId: "mockReceiverId",
        methodNames: ["mockMethodName"],
        allowance: BigInt(0),
    });

    describe("fromURLParam", () => {
        it("should return a permissions object", () => {
            const permissions = PermissionsCodec.fromURLParam(
                "eyJhbGxvd2FuY2UiOiIwIiwibWV0aG9kTmFtZXMiOlsibW9ja01ldGhvZE5hbWUiXSwicmVjZWl2ZXJJZCI6Im1vY2tSZWNlaXZlcklkIn0=",
            );
            expect(permissions).toEqual(mockPermissions);
        });
    });

    describe("toURLParam", () => {
        it("should return a URL", () => {
            const url = PermissionsCodec.toURLParam(mockPermissions);
            expect(url).toEqual(
                "eyJhbGxvd2FuY2UiOiIwIiwibWV0aG9kTmFtZXMiOlsibW9ja01ldGhvZE5hbWUiXSwicmVjZWl2ZXJJZCI6Im1vY2tSZWNlaXZlcklkIn0=",
            );
        });
    });
});
