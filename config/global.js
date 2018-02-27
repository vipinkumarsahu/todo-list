var countries = require('./countries.json'); //Import Countries
var states = require('./states.json'); //Import states
var months = require('./months.json'); //Import months
var gConfig = {
    months: months,
    countries: countries,
    states: states,
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