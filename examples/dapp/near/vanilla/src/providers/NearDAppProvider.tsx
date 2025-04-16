import React, { createContext, useContext, useMemo } from "react";
import { NearDAppClientFactory, NearDAppClient } from "@one-click-connect/vanilla-dapp/near";

interface NearDAppContextType {
    client: NearDAppClient;
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
        return NearDAppClientFactory.fromConfig({
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
