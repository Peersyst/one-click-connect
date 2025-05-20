import { PermissionsCodec } from "../../../../src/modules/common/codecs";

describe("PermissionsCodec", () => {
    const mockPermissions = {
        functionCall: {
            receiverId: "mockReceiverId",
            methodName: "mockMethodName",
            args: "mockArgs",
        },
    };

    describe("fromURLParam", () => {
        it("should return a permissions object", () => {
            const permissions = PermissionsCodec.fromURLParam(
                "eyJmdW5jdGlvbkNhbGwiOnsicmVjZWl2ZXJJZCI6Im1vY2tSZWNlaXZlcklkIiwibWV0aG9kTmFtZSI6Im1vY2tNZXRob2ROYW1lIiwiYXJncyI6Im1vY2tBcmdzIn19",
            );
            expect(permissions).toEqual(mockPermissions);
        });
    });

    describe("toURLParam", () => {
        it("should return a URL", () => {
            const url = PermissionsCodec.toURLParam(mockPermissions);
            expect(url).toEqual(
                "eyJmdW5jdGlvbkNhbGwiOnsicmVjZWl2ZXJJZCI6Im1vY2tSZWNlaXZlcklkIiwibWV0aG9kTmFtZSI6Im1vY2tNZXRob2ROYW1lIiwiYXJncyI6Im1vY2tBcmdzIn19",
            );
        });
    });
});
