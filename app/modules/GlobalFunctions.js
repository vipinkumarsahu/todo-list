var bcrypt = require('bcryptjs');
var dateFormat =  require('dateformat');
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

    /**
     /encryptPassword
	 * @param  {[type]} val [String Password]
     * @param  {[type]} hash [Hashed Password]
	 * @return {[type]}     [Bool]
     */
    checkPassword: function (val, hash) {
        if (hash != null && bcrypt.compareSync(val, hash)) {
            return true;
        } else {
            return false;
        }
    },

    errorPage : function (res, str) {
        if (str.status == 500) {
            res.render('common/error_500');
        }
    },

    admin_logs : function (data) {
        //Logs Table Query
    },

    dateFormat : dateFormat
};

module.exports = obj;