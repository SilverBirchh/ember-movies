/*
 * Creates a promise based `getItem` on localstorage. Abstracts the implementation away 
 * from usages. 
 * @param {String} key - The key of the item to fetch
 * @returns {Promise<String>} The value associated with the provided key. 
 */
export function getItem(key) {
    return new Promise(function(resolve, reject) {
        try {
            const value = localStorage.getItem(key);
            resolve(value);
        } catch (err) {
            reject();
        }
    });
}

/*
 * Creates a promise based `setItem` on localstorage. Abstracts the implementation away 
 * from usages. 
 * @param {String} key - The key of the item to set
 * @param {any} value - The value of the item to set
 */
export function setItem(key, value) {
    return new Promise(function(resolve, reject) {
        try {
            localStorage.setItem(key, value);
            resolve();
        } catch (err) {
            reject();
        }
    });
}

/*
 * Removes all storage associated with the project
 */
export function clearStorage() {
    return new Promise(function(resolve, reject) {
        try {
            localStorage.clear();
            resolve();
        } catch (err) {
            reject();
        }
    });
}