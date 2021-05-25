var envName = process.argv[2]
if(envName) {
    console.log('Environment: ' + envName);
} else {
    envName = 'localdev'
    console.log('No environment specified, defaulting to ' + envName);
    
}
var envConfig = require('./config/' + envName + '.js');
var defaultConfig = require('./config/default.js');
module.exports = Object.assign(defaultConfig, envConfig, {})