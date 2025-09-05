import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNearWallet } from "../providers/NearWalletProvider";
import { useWallet } from "../hooks/useWallet.ts";

// Placeholder data - replace with actual data fetching
const DAPP_DATA = [
    {
        name: "Example DApp",
        url: "http://localhost:3002", // Example URL for the vanilla dapp
        imageUrl: "https://static.thenounproject.com/png/1760714-200.png",
    },
    {
        name: "GuestBook",
        url: "http://localhost:3000", // Example URL for the vanilla dapp
        imageUrl: "https://pages.near.org/wp-content/uploads/2023/11/NEAR_token.png",
    },
    {
        name: "GuestBook (with LAK)",
        url: "http://localhost:3000", // Example URL for the vanilla dapp
        imageUrl: "https://pages.near.org/wp-content/uploads/2023/11/NEAR_token.png",
        accessKey: import.meta.env.VITE_GUEST_BOOK_ACCESS_KEY,
    },
    {
        name: "Meta Pool",
        url: "https://www.metapool.app/", // Example URL for the vanilla dapp
        imageUrl: "https://avatars.githubusercontent.com/u/112860635?s=200&v=4",
    },
    {
        name: "Meta Pool (with LAK)",
        url: "https://www.metapool.app/", // Example URL for the vanilla dapp
        imageUrl: "https://avatars.githubusercontent.com/u/112860635?s=200&v=4",
        accessKey: import.meta.env.VITE_META_POOL_ACCESS_KEY,
    },
];

const Home: React.FC = () => {
    const [accountId, setAccountId] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const { client } = useNearWallet();
    const { loading, wallet } = useWallet();

    useEffect(() => {
        // Placeholder data initialization - replace with actual logic
        setAccountId(wallet.accountId);
        setBalance("100.50 NEAR");
    }, [loading, wallet]);

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
                {accountId && (
                    <ul className="dapps-list">
                        {DAPP_DATA.map((dapp, index) => {
                            const dappUrl = client.requestSignIn({
                                accountID: accountId!,
                                accessKey: dapp.accessKey,
                                walletId: "sweat-wallet",
                            }, dapp.url);

                            return (
                                <li key={index} className="dapp-item">
                                    <a href={dappUrl} target="_blank" rel="noopener noreferrer" className="dapp-link">
                                        <img src={dapp.imageUrl} alt={`${dapp.name} logo`} className="dapp-logo" />
                                        <span className="dapp-name">{dapp.name}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default Home;
