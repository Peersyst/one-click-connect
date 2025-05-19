import React, { useEffect, useState } from "react";
import { useNearDApp } from "../providers/NearDAppProvider";
import { KeyPair } from "near-api-js/lib/utils";
import { Transaction } from "near-api-js/lib/transaction";

const Main: React.FC = () => {
    const { client } = useNearDApp();
    const [showModal, setShowModal] = useState(false);
    const [activeAccount, setActiveAccount] = useState<{ keypair: KeyPair; accountID: string; signingURL: string } | undefined>(undefined);

    useEffect(() => {
        const fetchAccount = () => {
            const account = client.getActiveAccount();
            setActiveAccount(account);
            console.log("Active Account:", account);
        };

        if (client) {
            fetchAccount();
        }
    }, [client]);

    const onCopySignFakUrl = async () => {
        if (!activeAccount) {
            return;
        }

        console.log("Signing URL:", activeAccount.signingURL);
        const url = client.requestSignWithFullAccessKey({
            transaction: Transaction.decode(
                Buffer.from(
                    "DAAAAG1vY2tTaWduZXJJZACcdRJ+JQOaKfqxr8M0e4Ylfcz1E107wi1yLO+td5FwvAEAAAAAAAAADgAAAG1vY2tSZWNlaXZlcklko7RnCT5MjkhJMV2ASLYPwYZorzhqPrGdadCYH6KZGxQAAAAA",
                    "base64",
                ),
            ),
            signingURL: activeAccount.signingURL,
        });

        try {
            await navigator.clipboard.writeText(url);
            console.log("Sign URL copied to clipboard:", url);
            setShowModal(false);
        } catch (err) {
            console.error("Failed to copy URL: ", err);
        }
    };

    return (
        <div className="main-container">
            <h1>Main Page</h1>
            <p>This is the main page, often used as the redirect target.</p>

            <div className="account-status">
                <h3>Account Status</h3>
                {activeAccount ? (
                    <>
                        <p>
                            Connected Account: <strong>{activeAccount.accountID}</strong>
                        </p>
                        <button onClick={() => setShowModal(true)}>Sign with Full Access Key</button>
                    </>
                ) : (
                    <p>No account is currently connected.</p>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Copy Signing URL</h2>
                        <p>Copy the URL needed to sign the transaction with the full access key.</p>
                        <div className="modal-buttons">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={onCopySignFakUrl} className="sign-button">
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;
