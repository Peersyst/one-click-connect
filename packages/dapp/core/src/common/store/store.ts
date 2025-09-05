export interface Store {
    /**
     * Removes the stored item from the local storage associated with the instance's prefix.
     * @param keyPrefix An extra prefix to index a certain value.
     */
    remove(keyPrefix?: `${string}:`): Promise<void>;
}
