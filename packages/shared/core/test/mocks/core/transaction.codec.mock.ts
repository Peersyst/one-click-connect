import { createGlobalMock, MethodMock } from "@shared/test";
import { TransactionCodec } from "../../../src/modules/common/codecs";
import { Transaction } from "near-api-js/lib/transaction";

export const TransactionCodecGlobalMock = createGlobalMock(TransactionCodec, {
    fromURLParam: new MethodMock(
        "mockReturnValue",
        Transaction.decode(
            Buffer.from(
                "DAAAAG1vY2tTaWduZXJJZACcdRJ+JQOaKfqxr8M0e4Ylfcz1E107wi1yLO+td5FwvAEAAAAAAAAADgAAAG1vY2tSZWNlaXZlcklko7RnCT5MjkhJMV2ASLYPwYZorzhqPrGdadCYH6KZGxQAAAAA",
                "base64",
            ),
        ),
    ),
    toURLParam: new MethodMock("mockReturnValue", "mockEncodedTransaction"),
});
