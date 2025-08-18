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
        const keyPair = near.KeyPair.fromString(privateKey as any);
        setLoading(true);
        const accountId = await getAccountIdFromKeyPair(keyPair);
        localStorage.setItem("privateKey", privateKey);
        setWallet({ keyPair, accountId });
        setLoading(false);
    }

    const getAccountIdFromKeyPair = async function (keypair: KeyPair): Promise<string> {
        const res = await fetch(`https://test.api.fastnear.com/v1/public_key/${keypair.getPublicKey()}/all`);
        const { account_ids } = await res.json();
        return account_ids[0];
    };

    useEffect(() => {
        const defaultPrivateKey = "ed25519:knVDvkgNSsvyAN37dHwZdJe5bVB2Xd2jXgx9dcLB6KnYqLyxz1v7JYGgZfggQy1jb8tXzs1asv9DaYzEboWBWRy";
        const storedKey = localStorage.getItem("privateKey");

        // Use stored key if available, otherwise use default
        const privateKey = storedKey || defaultPrivateKey;
        setPrivateKey(privateKey);
    }, []);


    return {
        loading,
        wallet,
        setPrivateKey,
    }
}
