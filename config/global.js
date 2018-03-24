var countries = require('./countries.json'); //Import Countries
var states = require('./states.json'); //Import states
var months = require('./months.json'); //Import months
const status = require('./status.json'); //Import Status
const priority = require('./priority.json'); //Import Priority status
const member = require('./member.json'); //Import member
var gConfig = {
    months: months,
    countries: countries,
    states: states,
    status: status,
    priority:priority,
    member:member,
    assets: {
        admin_analytics: {
            js: ["js/vendor/bootstrap-datepicker.min.js", "js/vendor/jquery.dataTables.min.js", "js/vendor/dataTables.bootstrap.min.js", "js/datatables.js"],
            css: ["css/vendor/bootstrap-datepicker.min.css", "css/vendor/dataTables.bootstrap.min.css", "css/vendor/jquery.dataTables.min.css"]
        }
    },
    allowedRoutes: ['/login/'],
    apiimageUrl: 'http://localhost:9000/api/shared'
    
};

module.exports = gConfig;