import React, { useState, useEffect } from "react";
import "./Home.css";

// Placeholder data - replace with actual data fetching
const DAPP_DATA = [
    {
        name: "Cool DApp 1",
        url: "http://localhost:3000", // Example URL for the vanilla dapp
        imageUrl: "https://via.placeholder.com/40?text=D1",
    },
];

const Home: React.FC = () => {
    const [accountId, setAccountId] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);

    useEffect(() => {
        // Placeholder data initialization - replace with actual logic
        setAccountId("mywallet.near");
        setBalance("100.50 NEAR");
    }, []);

    const signingURL = `${window.location.origin}/sign`;

    return (
        <div className="page-container home-page">
            <section className="account-info-section">
                <h2>Account Information</h2>
                {accountId && (
                    <div className="info-row">
                        <span className="info-label">Account ID:</span>
                        <span className="info-value">{accountId}</span>
                    </div>
                )}
                {balance && (
                    <div className="info-row">
                        <span className="info-label">Balance:</span>
                        <span className="info-value">{balance}</span>
                    </div>
                )}
            </section>

            <section className="dapps-section">
                <h2>DApps</h2>
                <ul className="dapps-list">
                    {DAPP_DATA.map((dapp, index) => {
                        const dappUrlWithParams = new URL(dapp.url);
                        if (accountId) {
                            dappUrlWithParams.searchParams.set("accountID", accountId);
                        }
                        dappUrlWithParams.searchParams.set("signingURL", signingURL);

                        return (
                            <li key={index} className="dapp-item">
                                <a href={dappUrlWithParams.toString()} target="_blank" rel="noopener noreferrer" className="dapp-link">
                                    <img src={dapp.imageUrl} alt={`${dapp.name} logo`} className="dapp-logo" />
                                    <span className="dapp-name">{dapp.name}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
};

export default Home;
