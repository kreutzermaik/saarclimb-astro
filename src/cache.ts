export default class Cache {

    /**
     * get item from cache
     * @param item
     * @returns
     */
    static getCacheItem(item: string): any {
        if (window) {
            return window.localStorage.getItem(item);
        }
    }

    /**
     * set item in cache
     * @param item
     * @param value
     */
    static setCacheItem(item: string, value: any) {
        if (window) {
            window.localStorage.setItem(item, JSON.stringify(value));
        }
    }

    /**
     * remove item from cache
     * @param item
     */
    static removeCacheItem(item: string) {
        if (window) {
            window.localStorage.removeItem(item);
        }
    }
}