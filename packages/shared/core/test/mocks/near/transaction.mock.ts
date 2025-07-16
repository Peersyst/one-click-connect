import { Transaction } from "near-api-js/lib/transaction";
import { mockify } from "@shared/test";
import { PublicKeyMock } from "./public-key.mock";

export const TransactionMock = mockify<Transaction>({
    signerId: "mockSignerId",
    nonce: BigInt(1),
    actions: [],
    blockHash: new Uint8Array([1, 2, 3]),
    publicKey: new PublicKeyMock(),
    receiverId: "mockReceiverId",
});
