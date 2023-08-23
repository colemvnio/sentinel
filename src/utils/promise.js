function nonBlockingPromise(pendingPromise) {
    return new Promise((resolve) => {
        pendingPromise.then(() => {
            setImmediate(() => {
                resolve();
            });
        });
    });
}


module.exports = { nonBlockingPromise };