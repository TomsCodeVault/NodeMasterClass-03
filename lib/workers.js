


// Dependencies
var path = require('path');
var fs = require('fs');
var _data = require('data');
var https = require('https');
var http = require('http');
var helpers = require('./helpers');
var _logs = require('./logs');

// Instantiate the workers object
var workers = {};

workers.log = function(){
  // Form the log data
  var logData = {
    paymentObject : {}
  };

  // Convert data to a string
  var logString = JSON.stringify(logData);

  // Determine the name of the log file
  var logFileName = 'payments';

  // Append the log string to the log file
  _logs.append(logFileName,logString,function(err){
    if(!err){
      console.log("Logging to file suceeded");
    } else {
      console.log("Logging to file failed");
    }
  });
};

// Export to workers module
module.exports = workers;
