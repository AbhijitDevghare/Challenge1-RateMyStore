function useDebounceHook(cb, delay = 1000) {
    let timerId;

    return (...args) => {
        clearTimeout(timerId);       // Clear any existing timer
        timerId = setTimeout(() => { // Start a new timer
            cb(...args);             // When timer completes, call the callback with latest arguments
        }, delay);
    }
}

export default useDebounceHook;
