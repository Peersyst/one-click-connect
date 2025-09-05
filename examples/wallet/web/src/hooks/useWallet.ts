import { useEffect, useState } from "react";
import * as near from "near-api-js";
import { KeyPair } from "near-api-js";

type Wallet = {
    keyPair?: KeyPair;
    accountId: string;
};

export function useWallet() {
    const [loading, setLoading] = useState<boolean>(true);
    const [wallet, setWallet] = useState<Wallet>({ accountId: "loading"});


    const setPrivateKey = async (privateKey: string) => {
        const keyPair = near.KeyPair.fromString(privateKey as `ed25519:${string}`);
        setLoading(true);
        const accountId = await getAccountIdFromKeyPair(keyPair);
        localStorage.setItem("privateKey", privateKey);
        setWallet({ keyPair, accountId });
        setLoading(false);
    }

    const getAccountIdFromKeyPair = async function (keypair: KeyPair): Promise<string> {
        const res = await fetch(`https://test.api.fastnear.com/v1/public_key/${keypair.getPublicKey()}/all`);
        // const res = await fetch(`https://api.fastnear.com/v1/public_key/${keypair.getPublicKey()}/all`);
        const { account_ids } = await res.json();
        return account_ids[account_ids.length - 1];
    };

    useEffect(() => {
        const defaultPrivateKey = import.meta.env.VITE_PRIVATE_KEY || "";
        const storedKey = localStorage.getItem("privateKey");

        // Use stored key if available, otherwise use default
        const privateKey = storedKey || defaultPrivateKey;
        setPrivateKey(privateKey);
    }, [setPrivateKey]);


    return {
        loading,
        wallet,
        setPrivateKey,
    }
}
