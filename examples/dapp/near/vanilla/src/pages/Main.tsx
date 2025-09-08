import React, { useEffect, useState } from "react";
import { useNearDApp } from "../providers/NearDAppProvider";
import { transactions } from "near-api-js";

const Main: React.FC = () => {
    const { client } = useNearDApp();
    const [showModal, setShowModal] = useState(false);
    const [activeAccount, setActiveAccount] = useState<{ accountID: string; } | undefined>(undefined);

    useEffect(() => {
        const fetchAccount = () => {
            setActiveAccount({ accountID: client!.accountId });
        };

        if (client) {
            fetchAccount();
        }
    }, [client]);

    const onSignLAK = async () => {
        const result = await client?.signAndSendTransaction({
            receiverId: "guest-book.testnet",
            actions: [
                transactions.functionCall(
                    "addMessage",
                    {
                        text: "Hello, World!",
                    },
                    100000000000000n,
                    0n,
                ),
            ]
        });

        if (result) {
            setShowModal(false);
        }
    };

    const onSignFAK = async () => {
        const result = await client?.signAndSendTransaction({
            receiverId: "occdemo.testnet",
            actions: [
                transactions.transfer(1000000000000000000000n),
            ]
        });

        if (result) {
            setShowModal(false);
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
                        <button onClick={() => setShowModal(true)}>Sign transaction</button>
                    </>
                ) : (
                    <p>No account is currently connected.</p>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Sign</h2>
                        <p>Sign a transaction with a limited or full access key.</p>
                        <div className="modal-buttons">
                            <button onClick={onSignLAK} className="sign-button">
                                Sign using LAK
                            </button>
                            <button onClick={onSignFAK} className="sign-button">
                                Sign using FAK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;
