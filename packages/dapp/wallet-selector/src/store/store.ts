export abstract class Store {
    private readonly prefix: `one-click-connect:${string}`;
    protected constructor(prefix: string) {
        this.prefix = `one-click-connect:${prefix}`;
    }

    /**
     * Sets a value in local storage using the specified prefix.
     * @param value The value to be stored in local storage.
     */
    protected setValue(value: string) {
        window.localStorage.setItem(this.prefix, value);
    }

    /**
     * Retrieves a value from the local storage based on the specified prefix.
     * @returns The value associated with the prefix if it exists in local storage; otherwise, null.
     */
    protected getValue(): string | null {
        return window.localStorage.getItem(this.prefix);
    }

    /**
     * Removes the stored item from the local storage associated with the instance's prefix.
     */
    remove() {
        window.localStorage.removeItem(this.prefix);
    }
}
