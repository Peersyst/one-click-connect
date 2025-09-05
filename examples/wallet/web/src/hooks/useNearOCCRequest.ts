import { useNearWallet } from "../providers/NearWalletProvider";
import { FunctionCallPermission, Transaction } from "near-api-js/lib/transaction";
import { useMemo } from "react";

export type UseNearOCCRequestResult =
    | {
          isInitialTxRequest: true;
          isFullAccessKeyRequest: false;
          data: {
              permissions: FunctionCallPermission;
              redirectURL: string;
              publicKey: string;
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

    return useMemo(() => {
        try {
            const { type, params } = client.parseDAppRequest(window.location.href);
            switch (type) {
                case "add-lak":
                    return {
                        isInitialTxRequest: true,
                        isFullAccessKeyRequest: false,
                        data: {
                            permissions: params.permissions as FunctionCallPermission,
                            redirectURL: params.redirectURL,
                            publicKey: params.publicKey
                        },
                    };
                case "sign-with-fak":
                    return {
                        isInitialTxRequest: false,
                        isFullAccessKeyRequest: true,
                        data: {
                            transaction: params.transactions[0],
                            redirectURL: params.redirectURL
                        },
                    };
                default:
                    throw Error("unknown request type");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_: unknown) {
            return {
                isInitialTxRequest: false,
                isFullAccessKeyRequest: false,
                data: undefined,
            };
        }
    }, [client]);
}
