const BaseRepository = require('./baseRepository');

class CustomerRepository extends BaseRepository {
    constructor() {
        super('customers')
    }
}

module.exports = CustomerRepository;