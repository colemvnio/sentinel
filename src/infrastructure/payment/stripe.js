const Stripe = require('stripe');
const logger = require('../logger');

class StripePaymentInfrastructure {
    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    async createCharge(amount, currency, source, description) {
        try {
            return this.stripe.charges.create({
                amount,
                currency,
                source,
                description,
            });
        } catch (error) {
            logger.error('Error creating Stripe charge:', error);
            throw error;
        }
    }
}

module.exports = StripePaymentInfrastructure;