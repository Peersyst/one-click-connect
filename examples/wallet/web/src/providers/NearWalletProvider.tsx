import React, { createContext, useContext, useMemo } from "react";
import { WalletClient } from "@one-click-connect/wallet";

interface NearDAppContextType {
    client: WalletClient;
}

const NearDAppContext = createContext<NearDAppContextType | null>(null);

export const useNearWallet = () => {
    const context = useContext(NearDAppContext);
    if (!context) {
        throw new Error("useNearWallet must be used within a NearWalletProvider");
    }
    return context;
};

interface NearWalletProviderProps {
    children: React.ReactNode;
}

export const NearWalletProvider: React.FC<NearWalletProviderProps> = ({ children }) => {
    const client = useMemo(() => {
        return new WalletClient({
            signingURL: window.location.origin + "/sign",
        });
    }, []);

    const value = useMemo(
        () => ({
            client,
        }),
        [client],
    );

    return <NearDAppContext.Provider value={value}>{children}</NearDAppContext.Provider>;
};
