import { Action } from "@near-wallet-selector/core/src/lib/wallet/transactions.types";
import type { AccessKeyView } from "@near-js/types";

/**
 * Check if given access key allows the function call or method attempted in transaction.
 * @param accessKey Array of \{access_key: AccessKey, public_key: PublicKey\} items.
 * @param receiverId The NEAR account attempting to have access.
 * @param actions The action(s) needed to be checked for access.
 * @returns If the access key has permissions.
 */
export const accessKeyHasPermissions = async (
    accessKey: AccessKeyView,
    receiverId: string | undefined,
    actions: Action[],
): Promise<boolean> => {
    const { permission } = accessKey;
    if (permission === "FullAccess") {
        return true;
    }

    if (permission.FunctionCall) {
        const { receiver_id: allowedReceiverId, method_names: allowedMethods } = permission.FunctionCall;
        if (allowedReceiverId === receiverId) {
            let allowed = true;

            for (const action of actions) {
                if (
                    !(
                        action.type === "FunctionCall" &&
                        (!action.params.deposit || action.params.deposit.toString() === "0") && // TODO: Should support charging amount smaller than allowance?
                        (allowedMethods.length === 0 || allowedMethods.includes(action.params.methodName))
                    )
                ) {
                    allowed = false;
                    break;
                }
            }
            return allowed;
        }
    }
    return false;
};
