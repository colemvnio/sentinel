/**
 * An enumeration of transaction events used in the application.
 *
 * @enum {string}
 *
 * @property {string} TRANSACTION_REQUEST_RECEIVED - Emitted when the POST request is received to create a transaction.
 * @property {string} TRANSACTION_PROCESSING_STARTED - Emitted when the transaction processing starts; when the charge is being created on Stripe.
 * @property {string} TRANSACTION_CHARGE_SUCCEEDED - Emitted when the charge is successfully created on Stripe.
 * @property {string} TRANSACTION_CHARGE_FAILED - Emitted when the charge creation on Stripe fails.
 * @property {string} TRANSACTION_SAVING_STARTED - Emitted when the application starts saving the transaction to the database.
 * @property {string} TRANSACTION_SAVED - Emitted when the transaction is successfully saved in the database.
 * @property {string} TRANSACTION_SAVE_FAILED - Emitted when the application fails to save the transaction to the database.
 * @property {string} TRANSACTION_RESPONSE_SENT - Emitted when the response is sent back to the customer.
 * @property {string} TRANSACTION_RESPONSE_FAILED - Emitted when the application fails to send the response to the customer.
 */
const TransactionEvents = Object.freeze({
    TRANSACTION_REQUEST_RECEIVED: 'transaction_request_received',
    TRANSACTION_PROCESSING_STARTED: 'transaction_processing_started',
    TRANSACTION_CHARGE_SUCCEEDED: 'transaction_charge_succeeded',
    TRANSACTION_CHARGE_FAILED: 'transaction_charge_failed',
    TRANSACTION_SAVING_STARTED: 'transaction_saving_started',
    TRANSACTION_SAVED: 'transaction_saved',
    TRANSACTION_SAVE_FAILED: 'transaction_save_failed',
    TRANSACTION_RESPONSE_SENT: 'transaction_response_sent',
    TRANSACTION_RESPONSE_FAILED: 'transaction_response_failed',
});

module.exports = TransactionEvents;