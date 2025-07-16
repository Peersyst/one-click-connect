import React, { useEffect, useState } from "react";
import "./Sign.css"; // Import CSS for styling
import { Transaction } from "near-api-js/lib/transaction";
import { useNearOCCRequest } from "../hooks/useNearOCCRequest";

const Sign: React.FC = () => {
    const [permissions, setPermissions] = useState<string | null>(null);
    const [redirectURL, setRedirectURL] = useState<string | null>(null);
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [copyButtonText, setCopyButtonText] = useState("Copy Redirect URL");
    const { isInitialTxRequest, isFullAccessKeyRequest, data } = useNearOCCRequest();

    useEffect(() => {
        if (isInitialTxRequest) {
            setPermissions(JSON.stringify(data?.permissions, (_, val) => (typeof val === "bigint" ? val.toString() : val), 2));
            setRedirectURL(data?.redirectURL);
            setPublicKey(data?.publicKey.toString());
        } else if (isFullAccessKeyRequest) {
            setTransaction(data?.transaction);
            setRedirectURL(data?.redirectURL);
        }
    }, [isInitialTxRequest, isFullAccessKeyRequest, data]);

    const onCopyRedirectUrl = async () => {
        if (!redirectURL) {
            return;
        }

        try {
            await navigator.clipboard.writeText(redirectURL);
            console.log("Redirect URL copied to clipboard:", redirectURL);
            setCopyButtonText("Copied!");
            setTimeout(() => setCopyButtonText("Copy Redirect URL"), 1500); // Reset text
        } catch (err) {
            console.error("Failed to copy Redirect URL: ", err);
            setCopyButtonText("Copy Failed");
            setTimeout(() => setCopyButtonText("Copy Redirect URL"), 1500);
        }
    };

    return (
        <div className="page-container sign-page">
            <h1>Sign Page</h1>
            <p>Checking for required signing information...</p>

            {!isInitialTxRequest && !isFullAccessKeyRequest && <p>No signing parameters detected in the URL.</p>}

            <div className="params-container">
                <h2>Detected Parameters:</h2>
                <ul>
                    {permissions && (
                        <li>
                            Permissions: <span className="param-value">{permissions}</span>
                        </li>
                    )}
                    {redirectURL && (
                        <li>
                            Redirect URL: <span className="param-value">{redirectURL}</span>
                        </li>
                    )}
                    {publicKey && (
                        <li>
                            Public Key: <span className="param-value">{publicKey}</span>
                        </li>
                    )}
                    {transaction && (
                        <li>
                            Transaction:{" "}
                            <span className="param-value">
                                {JSON.stringify(transaction, (_, value) => (typeof value === "bigint" ? value.toString() : value))}
                            </span>
                        </li>
                    )}
                </ul>

                {redirectURL && (
                    <button onClick={onCopyRedirectUrl} className="copy-button">
                        {copyButtonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sign;
