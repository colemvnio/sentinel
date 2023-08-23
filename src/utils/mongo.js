const { ObjectId } = require('mongodb');

function stringToObjectId(str) {
    if (ObjectId.isValid(str)) return new ObjectId(str);
    throw new Error('Invalid ObjectId format');
}

module.exports = { stringToObjectId };
