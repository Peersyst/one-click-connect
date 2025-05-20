import { mockify } from "@shared/test";
import { FunctionCallPermission } from "near-api-js/lib/transaction";

export const FunctionCallPermissionMock = mockify<FunctionCallPermission>({
    allowance: BigInt(0),
    methodNames: ["mockMethod"],
    receiverId: "mockReceiverId",
});
