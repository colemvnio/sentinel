const crypto = require('crypto');

const ENCRYPTION_ALGORITHM = 'aes-256-cbc';

class CryptoUtil {
  static encrypt(data) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      ENCRYPTION_ALGORITHM,
      Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
      iv,
    );
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  static decrypt(encryptedData) {
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      ENCRYPTION_ALGORITHM,
      Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
      iv,
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  static generateEncryptionKey() {
    return crypto.randomBytes(32).toString('hex');
  }
}

module.exports = CryptoUtil;
