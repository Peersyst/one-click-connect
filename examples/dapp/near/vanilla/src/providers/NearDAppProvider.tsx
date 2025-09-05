import React, { createContext, useContext, useEffect, useState } from "react";
import { DAppClient } from "@one-click-connect/dapp-sdk";
import { connect } from "near-api-js";
import { InMemoryKeyStore } from "near-api-js/lib/key_stores";

interface NearDAppContextType {
    client: DAppClient | null;
    isLoading: boolean;
}

const NearDAppContext = createContext<NearDAppContextType | null>(null);

export const useNearDApp = () => {
    const context = useContext(NearDAppContext);
    if (!context) {
        throw new Error("useNearDApp must be used within a NearDAppProvider");
    }
    return context;
};

interface NearDAppProviderProps {
    children: React.ReactNode;
}

export const NearDAppProvider: React.FC<NearDAppProviderProps> = ({ children }) => {
    const [client, setClient] = useState<DAppClient | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeClient = async () => {
            try {
                const keyStore = new InMemoryKeyStore();
                const connection = await connect({
                    networkId: "testnet",
                    nodeUrl: "https://rpc.testnet.near.org",
                    keyStore,
                });

                const newClient = new DAppClient(
                    {
                        redirectURL: window.location.origin + "/main",
                    },
                    connection,
                    keyStore,
                    {
                        receiverId: "guest-book.testnet",
                        methodNames: ["addMessage"],
                    },
                );

                await newClient.connect(window.location.href, true);

                setClient(newClient);
            } catch (error) {
                console.error("Failed to initialize NEAR client:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeClient();
    }, []);

    const value = {
        client,
        isLoading
    };

    return <NearDAppContext.Provider value={value}>{children}</NearDAppContext.Provider>;
};