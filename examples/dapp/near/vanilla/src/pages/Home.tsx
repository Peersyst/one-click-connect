import React, { useEffect, useState } from "react";
import { useNearDApp } from "../providers/NearDAppProvider";
import { useSearchParams } from "react-router-dom";
import { FunctionCallPermission } from "near-api-js/lib/transaction";
import "./Home.css";

const Home: React.FC = () => {
    const { client } = useNearDApp();
    const [searchParams] = useSearchParams();
    const [accountId, setAccountId] = useState<string | null>(null);
    const [signingUrl, setSigningUrl] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const accountID = searchParams.get("accountID");
        const signingURL = searchParams.get("signingURL");

        if (accountID && signingURL) {
            setAccountId(accountID);
            setSigningUrl(signingURL);
        }
    }, [searchParams, client]);

    const onSignInitialTx = () => {
        if (!accountId || !signingUrl) {
            return;
        }

        const url = client.signInitialTx({
            accountID: accountId,
            signingURL: signingUrl,
            permissions: new FunctionCallPermission({
                receiverId: "test.near",
                methodNames: ["test"],
                allowance: BigInt(0),
            }),
        });

        console.log(url);
        window.open(url, "_blank");
    };

    return (
        <div className="home-container">
            <h1>{`User ${accountId ? "detected" : "not detected"}`}</h1>
            {accountId && <p>{`Account ID: ${accountId}`}</p>}
            {signingUrl && <p>{`Signing URL: ${signingUrl}`}</p>}
            {accountId && signingUrl && <button onClick={() => setShowModal(true)}>Sign Transaction</button>}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Transaction Signing</h2>
                        <p>Would you like to sign the transaction?</p>
                        <div className="modal-buttons">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={onSignInitialTx} className="sign-button">
                                Sign Transaction
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
