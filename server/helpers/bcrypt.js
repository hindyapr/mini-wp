const bcrypt = require('bcryptjs');

module.exports = {
    encode(pass) {
        return bcrypt.hashSync(pass, 9);
    },
    decode(pass, hash) {
        return bcrypt.compareSync(pass, hash);
    }
}