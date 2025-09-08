export interface Callbacks {
    onRequestAddLAK(url: string): Promise<void>;
    onRequestSignWithFAK(url: string): Promise<void>;
}
