import { Transaction } from "near-api-js/lib/transaction";
import { mockify } from "@shared/test";
import { PublicKeyMock } from "./public-key.mock";

export const TransactionMock = mockify<Transaction>({
    signerId: "mockSignerId",
    nonce: 1,
    actions: [],
    blockHash: "mockBlockHash",
    publicKey: new PublicKeyMock(),
    receiverId: "mockReceiverId",
});
