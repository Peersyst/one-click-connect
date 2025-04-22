import React, { useEffect, useState } from "react";
import { useNearDApp } from "../providers/NearDAppProvider";
import { KeyPair } from "near-api-js/lib/utils";
const Main: React.FC = () => {
    const { client } = useNearDApp();
    const [activeAccount, setActiveAccount] = useState<{ keypair: KeyPair; accountID: string } | undefined>(undefined);

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

    return (
        <div className="main-container">
            <h1>Main Page</h1>
            <p>This is the main page, often used as the redirect target.</p>

            <div className="account-status">
                <h3>Account Status</h3>
                {activeAccount ? (
                    <p>
                        Connected Account: <strong>{activeAccount.accountID}</strong>
                    </p>
                ) : (
                    <p>No account is currently connected.</p>
                )}
            </div>
        </div>
    );
};

export default Main;
