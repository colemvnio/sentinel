/**
 * An enumeration of Stripe event names used in the application.
 *
 * @enum {string}
 *
 * @property {string} CHARGE_CREATED - Emitted when a new charge is created.
 * @property {string} CHARGE_CAPTURED - Emitted when a charge is captured.
 * @property {string} CHARGE_FAILED - Emitted when a charge fails.
 * @property {string} CHARGE_UPDATED - Emitted when a charge is updated.
 * @property {string} CHARGE_REFUNDED - Emitted when a charge is refunded.
 * @property {string} CUSTOMER_CREATED - Emitted when a new customer is created.
 * @property {string} CUSTOMER_UPDATED - Emitted when a customer is updated.
 * @property {string} PREAUTHORIZATION_HOLD_CREATED - Emitted when a new a preuthorization hold is created.
 * @property {string} PREAUTHORIZATION_HOLD_UPDATED - Emitted when an preauthorization hold is updated.
 * @property {string} PREAUTHORIZATION_HOLD_CAPTURED - Emitted when an preauthorization hold is captured.
 * @property {string} CARD_EXPIRING - Emitted when a card is about to expire.
 * @property {string} CARD_UPDATED - Emitted when a card is updated.
 * @property {string} DISPUTE_CREATED - Emitted when a new dispute is created.
 * @property {string} DISPUTE_CLOSED - Emitted when a dispute is closed.
 */
const StripeEventNames = Object.freeze({
  CHARGE_CREATED: 'charge_created',
  CHARGE_CAPTURED: 'charge_captured',
  CHARGE_FAILED: 'charge_failed',
  CHARGE_UPDATED: 'charge_updated',
  CHARGE_REFUNDED: 'charge_refunded',
  CUSTOMER_CREATED: 'customer_created',
  CUSTOMER_UPDATED: 'customer_updated',
  PREAUTHORIZATION_HOLD_CREATED: 'authorization_hold_created',
  PREAUTHORIZATION_HOLD_UPDATED: 'authorization_hold_updated',
  PREAUTHORIZATION_HOLD_CAPTURED: 'authorization_hold_captured',
  CARD_EXPIRING: 'card_expiring',
  DISPUTE_CREATED: 'dispute_created',
  DISPUTE_CLOSED: 'dispute_closed',
});

module.exports = StripeEventNames;
