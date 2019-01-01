/*
 * Frontend logic for application
 *
 */

 // Container for the frontend application
 var app = {};

 // Config
 app.config = {
   'sessionToken' : false
 };

 // AJAX Client for the restful api
 app.client = {};

 // Interface for making API calls
 app.client.request = function(headers,path,method,queryString,payload,callback){
   // Set defaults
   headers = typeof(headers) == 'object' && headers !== null ? headers : {};
   path = typeof(path) == 'string' ? path : '/';
   method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method) > -1 ? method.toUpperCase() : 'GET';
   queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
   payload = typeof(payload) == 'object' && payload !== null ? payload : {};
   callback = typeof(callback) == 'function' ? callback : false;

   // Add queryString parameters to path
   // For each query string parameter, add it to the path
   var requestUrl = path+'?';
   var counter = 0;
   for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // Add ampersand if necessary
       if(counter > 1){
         requestUrl += '&';
       }
       // Add key and value
       requestUrl+=queryKey+'='+queryStringObject[queryKey];
     }
   }

   // Form the http request as a json object
   var xhr = new XMLHttpRequest();
   xhr.open(method,requestUrl,true);
   xhr.setRequestHeader("Content-Type","application/json");

   // For each header sent, add it to the request
   for(var headerKey in headers){
     if(headers.hasOwnProperty(headerKey)){
       xhr.setRequestHeader(headerKey,headers[headerKey]);
     }
   }

   // If there is a current session token, add that to header
   if(app.config.sessionToken){
     xhr.setRequestHeader("token",app.config.sessionToken.id);
   }

   // When the request returns, handle the response
   xhr.onreadystatechange = function(){
     if(xhr.readyState == XMLHttpRequest.DONE){
       var statusCode = xhr.status;
       var responseReturned = xhr.responseText;

       // Callback if requested
       if(callback){
         try{
           var parsedResponse = JSON.parse(responseReturned);
           callback(statusCode,parsedResponse);
         } catch(e) {
           callback(statusCode,false);
         }
       }
     }
   };

   // Send the request
   var payloadString = JSON.stringify(payload);
   xhr.send(payloadString);

 };
