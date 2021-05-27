const connections = require('../knexfile');
  
  var envName = process.argv[2]
  if(connections[envName] != undefined) {
      console.log('Environment: ' + envName);
  }else {
      envName = 'production'
      console.log('No environment specified, defaulting to ' + envName);
  }
  
  const connection = require('knex')(connections[envName])
  
  module.exports = connection