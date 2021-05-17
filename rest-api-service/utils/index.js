'use strict';

/**
 * 
 * Returns a JSON.stringified version of the object provided.
 * 
 * @param { object } object Object to be stringified.
 */
const serialize = (object) => {
  return JSON.stringify(object, null, 2);
}

/**
 * 
 * Translates input object's values back to integers if they have been converted to strings during stringification. Returns a new object.
 * 
 * @param { object } obj Object to be translated.
 */
const translateObjectIntStrings = (obj) => {
  const res = {}
  for (const key in obj) {
    res[key] = {};
    for (const prop in obj[key]) {
      const parsed = parseInt(obj[key], 10);
      res[key] = isNaN(parsed) ? obj[key] : parsed;
    }
  }
  return res;
}

/**
 * 
 * Returns an Error HTTP Response.
 * 
 * @param { object } error Error to be returned with the response.
 */
const formatError = (error) => {
  var response = {
    "statusCode": error.code ? error.code : error.statusCode,
    "headers": {
      "Content-Type": "text/plain",
      "x-amzn-ErrorType": error.code
    },
    "isBase64Encoded": false,
    "body": error.code + ": " + error.message
  }
  return response
}


/**
 * 
 * Returns a HTTP 200 response.
 * 
 * @param { object } body Payload to be returned with the response.
 */
const formatResponse = (body) => {
  var response = {
    "statusCode": 200,
    "headers": {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    "body": body
  }
  return response
}

/**
 * 
 * Returns a HTTP 301 response.
 * 
 * @param { String } location re-direction location.
 */
 const formatRedirect = (location) => {
  var response = {
    "statusCode": 301,
    "headers": {
      "Location": location
    }
  }
  return response
}

module.exports = { serialize, translateObjectIntStrings , formatError, formatResponse, formatRedirect };