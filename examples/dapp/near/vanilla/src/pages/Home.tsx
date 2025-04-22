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
    const [copyButtonText, setCopyButtonText] = useState("Copy Sign URL");

    useEffect(() => {
        const accountID = searchParams.get("accountID");
        const signingURL = searchParams.get("signingURL");

        if (accountID && signingURL) {
            setAccountId(accountID);
            setSigningUrl(signingURL);
        }
        if (client) {
            const account = client.getActiveAccount();
            if (account) {
                setAccountId(account.accountID);
            }
        }
    }, [searchParams, client]);

    const onCopySignUrl = async () => {
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

        try {
            await navigator.clipboard.writeText(url);
            console.log("Sign URL copied to clipboard:", url);
            setCopyButtonText("Copied!");
            setTimeout(() => {
                setCopyButtonText("Copy Sign URL");
                setShowModal(false); // Optionally close modal after copy
            }, 1500); // Reset text after 1.5 seconds
        } catch (err) {
            console.error("Failed to copy URL: ", err);
            setCopyButtonText("Copy Failed");
            setTimeout(() => setCopyButtonText("Copy Sign URL"), 1500);
        }
    };

    return (
        <div className="home-container">
            <h1>{`User ${accountId ? "detected" : "not detected"}`}</h1>
            {accountId && <p>{`Account ID: ${accountId}`}</p>}
            {signingUrl && <p>{`Signing URL: ${signingUrl}`}</p>}
            {accountId && signingUrl && <button onClick={() => setShowModal(true)}>Prepare Sign URL</button>}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Copy Signing URL</h2>
                        <p>Copy the URL needed to sign the transaction.</p>
                        <div className="modal-buttons">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={onCopySignUrl} className="sign-button">
                                {copyButtonText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
