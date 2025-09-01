import * as nearAPI from "near-api-js";

export type KeyPairString = `ed25519:${string}` | `secp256k1:${string}`;

/**
 * Derives and returns the public key corresponding to the given private key.
 * @param privateKey The private key from which to derive the public key.
 * @returns The derived public key as a string.
 */
export function getPublicKey(privateKey: string): string {
    const keyPair = nearAPI.KeyPair.fromString(privateKey as KeyPairString);
    return keyPair.getPublicKey().toString();
}
