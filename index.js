/*
 *Primary file for the API
 *
 */

 // Dependencies
 var server = require('./lib/server');
 var workers = require('./lib/server');

 // Declare app
 var app = {};

 // Init function
 app.init = function(){
   // Start the server
   server.init();

   // Start the workers
   // workers.init();
 };

 // Execute
 app.init();

 // Export the app
 module.exports = app;
