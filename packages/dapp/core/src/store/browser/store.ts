import { Store } from "../../common";

export abstract class BrowserStore implements Store {
    private readonly prefix: `one-click-connect:${string}`;
    protected constructor(prefix: string) {
        this.prefix = `one-click-connect:${prefix}`;
    }

    /**
     * Sets a value in local storage using the specified prefix.
     * @param value The value to be stored in local storage.
     * @param keyPrefix Extra prefix to index this value.
     */
    protected setValue(value: string, keyPrefix?: `${string}:`) {
        window.localStorage.setItem(`${this.prefix}${keyPrefix ?? ""}`, value);
    }

    /**
     * Retrieves a value from the local storage based on the specified prefix.
     * @param keyPrefix Extra prefix to index this value.
     * @returns The value associated with the prefix if it exists in local storage; otherwise, null.
     */
    protected getValue(keyPrefix?: `${string}:`): string | null {
        return window.localStorage.getItem(`${this.prefix}${keyPrefix ?? ""}`);
    }

    /**
     * @inheritDoc
     */
    async remove(keyPrefix?: `${string}:`) {
        window.localStorage.removeItem(`${this.prefix}${keyPrefix ?? ""}`);
    }
}
