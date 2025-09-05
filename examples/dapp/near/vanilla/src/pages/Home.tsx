import React, { useEffect, useState } from "react";
import { useNearDApp } from "../providers/NearDAppProvider";
import { useSearchParams } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
    const { client } = useNearDApp();
    const [searchParams] = useSearchParams();
    const [accountId, setAccountId] = useState<string | null>(null);
    const [signingUrl, setSigningUrl] = useState<string | null>(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [copyButtonText] = useState("Copy Sign URL");

    useEffect(() => {
        const accountID = searchParams.get("accountID");
        const signingURL = searchParams.get("signingURL");

        if (accountID && signingURL) {
            setAccountId(accountID);
            setSigningUrl(signingURL);
        }
        if (client) {
            const account = client.accountId;
            if (account) {
                setAccountId(client.accountId);
                setIsSignedIn(true);
            } else if (accountID && signingURL) {
                const isSignedIn = client.connected;
                if (isSignedIn) {
                    setAccountId(accountID);
                    setIsSignedIn(true);
                }
            }
        }
    }, [searchParams, client]);

    const handleSignOut = async () => {
        await client?.disconnect();
        setAccountId(null);
        setSigningUrl(null);
        setIsSignedIn(false);
    };

    const onCopySignUrl = async () => {
        if (!accountId || !signingUrl) {
            return;
        }
        setShowModal(false); // Optionally close modal after copy
    };

    return (
        <div className="home-container">
            <h1>{`User ${accountId ? "detected" : "not detected"}`}</h1>
            {accountId && <p>{`Account ID: ${accountId}`}</p>}
            {signingUrl && <p>{`Signing URL: ${signingUrl}`}</p>}

            {!isSignedIn && accountId && signingUrl && <button onClick={() => setShowModal(true)}>Prepare Sign URL</button>}
            {isSignedIn && <button onClick={handleSignOut}>Sign Out</button>}

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
