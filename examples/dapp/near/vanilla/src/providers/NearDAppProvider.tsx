import React, { createContext, useContext, useMemo } from "react";
import { ClientFactory, Client } from "@one-click-connect/browser-dapp";

interface NearDAppContextType {
    client: Client;
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
    const client = useMemo(() => {
        return ClientFactory.newClient({
            redirectURL: window.location.origin + "/main",
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
