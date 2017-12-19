var bcrypt = require('bcryptjs');
var saltRounds = 10;

var obj = {
	/**
	 * /encryptPassword
	 * @param  {[type]} val [String Password]
	 * @return {[type]}     [Hashed Password]
	 */
    encryptPassword: function (val) {
        val = bcrypt.hashSync(val, saltRounds);
        return val;
    },

    checkPassword: function (val, hash) {
        if (hash != null && bcrypt.compareSync(val, hash)) {
            return true;
        } else {
            return false;
        }
    }
};

module.exports = obj;