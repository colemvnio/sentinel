const BaseLoggingService = require('../events/baseLoggingService');

class BaseService {
  constructor(repository) {
    if (new.target === BaseService) {
      throw new TypeError('Cannot construct BaseService instances directly');
    }
    this.repository = repository;
    this.device = null;
    this.eventLoggingService = new BaseLoggingService();
  }

  setDevice(device) {
    this.device = device;
  }

  async getById(id) {
    return this.repository.getById(id);
  }

  async getAll(query) {
    return this.repository.getAll(query);
  }

  async insertOne(document) {
    return this.repository.insertOne(document);
  }

  async updateOne(query, update, options) {
    return this.repository.updateOne(query, update, options);
  }

  async findOneAndUpdate(query, update, returnOriginal = 'after') {
    return this.repository.findOneAndUpdate(query, update, returnOriginal);
  }
}

module.exports = BaseService;
