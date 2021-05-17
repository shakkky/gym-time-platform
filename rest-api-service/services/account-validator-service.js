'use strict';
const { formatError, formatRedirect } = require("../utils");
const { updateAccountStatus } = require("../db/account-db");

/**
 * 
 * Validates and extracts the required details from the incoming event.
 * 
 * @param { object } event Event object.
 */
const processEvent = (event) => {
  var { accountId } = event.pathParameters;
  if (!accountId){
    throw({ code: 400, message: 'missing Account Id'});
  }
  return { accountId };
}

const accountValidatorHandler = async (event) => {
  try {
    //extract details from event
    var { accountId } = processEvent(event);

    //insert item into table
    var dbRes = await updateAccountStatus(accountId, true);
    console.log(`Item Updated: ${JSON.stringify(dbRes)}`);

    // // REDIRECT
    return formatRedirect(`${process.env.CLIENT_SERVICE}/verified`);
  } catch (e){

    // an error has occured. Log the error
    console.log(e);

    // format and return the error
    return formatError(e);
  }
};

module.exports = { accountValidatorHandler, processEvent };