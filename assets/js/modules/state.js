/**
 * Signals Implementation for Reactive State Management
 */

let currentObserver = null;

/**
 * Creates a reactive signal
 * @param {any} initialValue 
 * @returns {Array} [getter, setter]
 */
export function createSignal(initialValue) {
    let value = initialValue;
    const observers = new Set();

    const read = () => {
        if (currentObserver) {
            observers.add(currentObserver);
        }
        return value;
    };

    const write = (newValue) => {
        if (typeof newValue === 'function') {
            newValue = newValue(value);
        }
        if (value !== newValue) {
            value = newValue;
            // Create a copy of observers before notifying to prevent infinite loops
            // if an observer mutates the set
            const currentObservers = new Set(observers);
            currentObservers.forEach(observer => observer());
        }
    };

    return [read, write];
}

/**
 * Creates an effect that re-runs when its dependencies change
 * @param {Function} effectFn 
 */
export function createEffect(effectFn) {
    const execute = () => {
        currentObserver = execute;
        try {
            effectFn();
        } finally {
            currentObserver = null;
        }
    };
    
    // Initial run to capture dependencies
    execute();
}

/**
 * Global application store using signals
 */
export const store = {
    signals: {},
    
    /**
     * Helper to initialize a signal in the global store
     */
    initSignal(key, initialValue) {
        if (!this.signals[key]) {
            const [get, set] = createSignal(initialValue);
            this.signals[key] = { get, set };
        }
        return this.signals[key];
    },

    /**
     * Get value from global store
     */
    get(key) {
        return this.signals[key]?.get();
    },

    /**
     * Set value in global store
     */
    set(key, value) {
        if (this.signals[key]) {
            this.signals[key].set(value);
        }
    }
};
