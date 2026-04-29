const bycrypt = require('bcryptjs')

exports.hashing = (value,saltValue) => {
    const result = bycrypt.hash(value,saltValue)
    return result
}

exports.hashValidation = (inputPassword,hashedPassword) => {
    const result = bycrypt.compare(inputPassword,hashedPassword);
    return result;
}