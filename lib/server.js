/*
 * Server related tasks
 *
 */

// Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var handlers = require('./handlers');
var helpers = require('./helpers');
var path = require('path');

// Instantiate the server module object
var server = {};

// Instantiate the HTTP server
server.httpServer = http.createServer(function(req, res){
  server.unifiedServer(req,res);
});

// Instatiate the HTTPS server
server.httpsServerOptions = {
  'key' : fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
  'cert' : fs.readFileSync(path.join(__dirname,'/../https/cert.pem'))
};
server.httpsServer = https.createServer(server.httpsServerOptions,function(req, res){
  server.unifiedServer(req,res);
});

// All the server logic for both http and https servervar
server.unifiedServer = function(req,res){

  // Parse the url from the requests
  var parsedUrl = url.parse(req.url,true);

  // Get the path from the url and remove trailing /
  var  path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

	// Get query string from request as object
	var queryStringObject = parsedUrl.query;

  // Get request method
  var method = req.method.toLowerCase();

	// Get headers from request as object
	var headers = req.headers;

  // Get payload if any
	var decoder = new StringDecoder('utf-8');
	var buffer = '';
	req.on('data',function(data){
		buffer += decoder.write(data);
	});
	req.on('end',function(){
		buffer += decoder.end();

		// Choose the handler this request should use. If one is not found use the notFound handler
		var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

		// Construct the data object to send to the handler
		var data = {
			'trimmedPath' : trimmedPath,
			'queryStringObject' : queryStringObject,
			'method' : method,
			'headers' : headers,
			'payload' : helpers.parseJsonToObject(buffer)
		};

		// Route the request to the specified route
		chosenHandler(data,function(statusCode,payload){
			// Use the status code called back or default to 200
			statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

			// Use the payload called back or default to an empty object
			payload = typeof(payload) == 'object' ? payload : {};

			// Convert the payload to a string
			var payloadString = JSON.stringify(payload);

			// Return the response
			res.setHeader('Content-Type','application/json');
			res.writeHead(statusCode);
			res.end(payloadString);

			// Log request path to console
			console.log('Returning this response: ',statusCode,payloadString);

		});

	});
};

// Define a request router
server.router = {
	'ping' : handlers.ping,
  'users' : handlers.users,
  'tokens' : handlers.tokens,
  'menu' : handlers.menu,
  'orders' : handlers.orders,
  'carts' : handlers.carts,
  'carts/items/add' : handlers.carts,
  'carts/items/update' : handlers.carts,
  'carts/items/remove' : handlers.carts,
  'carts/items/empty' : handlers.carts
};

// Init script
server.init = function(){
  // Start the HTTP server
  server.httpServer.listen(config.httpPort,function(){
    console.log("The server is listening on port "+config.httpPort);
  });

  // Start the HTTPS server
  server.httpsServer.listen(config.httpsPort,function(){
    console.log("The server is listening on port "+config.httpsPort);
  });
};

// Export the server
module.exports = server;
