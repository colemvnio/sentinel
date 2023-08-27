const CryptoUtil = require('../../src/utils/crypto');
const logger = require('../../src/infrastructure/logger');

logger.info(CryptoUtil.generateEncryptionKey());
