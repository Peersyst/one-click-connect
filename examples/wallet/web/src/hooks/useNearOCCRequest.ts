import { PublicKey } from "near-api-js/lib/utils";
import { useNearWallet } from "../providers/NearWalletProvider";
import { FunctionCallPermission, Transaction } from "near-api-js/lib/transaction";

export type UseNearOCCRequestResult =
    | {
          isInitialTxRequest: true;
          isFullAccessKeyRequest: false;
          data: {
              permissions: FunctionCallPermission;
              redirectURL: string;
              publicKey: PublicKey;
          };
      }
    | {
          isInitialTxRequest: false;
          isFullAccessKeyRequest: true;
          data: {
              transaction: Transaction;
              redirectURL: string;
          };
      }
    | {
          isInitialTxRequest: false;
          isFullAccessKeyRequest: false;
          data: undefined;
      };

export function useNearOCCRequest(): UseNearOCCRequestResult {
    const { client } = useNearWallet();

    try {
        const { permissions, redirectURL, publicKey } = client.parseSignInitialTxRequest(window.location.href);
        return {
            isInitialTxRequest: true,
            isFullAccessKeyRequest: false,
            data: { permissions, redirectURL, publicKey },
        };
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "INVALID_URL") {
            const { transaction, redirectURL } = client.parseFullAccessKeyRequest(window.location.href);
            return {
                isInitialTxRequest: false,
                isFullAccessKeyRequest: true,
                data: { transaction, redirectURL },
            };
        }

        return {
            isInitialTxRequest: false,
            isFullAccessKeyRequest: false,
            data: undefined,
        };
    }
}
