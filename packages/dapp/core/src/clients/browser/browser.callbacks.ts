import { Callbacks } from "../../common";

export class BrowserCallbacks implements Callbacks {
    /**
     * Handles the request to add a LAK by redirecting the user to the provided URL.
     * @param url The URL to navigate to for adding the LAK.
     */
    async onRequestAddLAK(url: string): Promise<void> {
        window.location.assign(url);
    }

    /**
     * Handles the request to sign transaction using FAK.
     * @param url The URL to which the signing request will be sent.
     */
    async onRequestSignWithFAK(url: string): Promise<void> {
        window.location.assign(url);
    }
}
