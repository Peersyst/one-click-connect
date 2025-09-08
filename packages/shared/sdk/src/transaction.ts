import { Action } from "near-api-js/lib/transaction";

export interface Transaction {
    signerId?: string;
    receiverId?: string;
    actions: Array<Action>;
}
