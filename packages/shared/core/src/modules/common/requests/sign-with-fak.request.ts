import { Transaction } from "near-api-js/lib/transaction";

export type SignWithFakRequest = {
    transaction: Transaction;
    signingURL: string;
};
