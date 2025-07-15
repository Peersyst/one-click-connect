import React, { createContext, useContext, useMemo } from "react";
import { WalletClient } from "@one-click-connect/wallet";

interface NearDAppContextType {
    client: WalletClient;
}

const NearDAppContext = createContext<NearDAppContextType | null>(null);

export const useNearWallet = () => {
    const context = useContext(NearDAppContext);
    if (!context) {
        throw new Error("useNearDApp must be used within a NearDAppProvider");
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
