'use strict';
const { serialize , formatError, formatResponse } = require("../utils");
const { sendOrderConfirmation } = require("../utils/email");
const { insertItem } = require("../db/account-db");

/**
 * 
 * Validates and extracts the required details from the incoming event.
 * 
 * @param { object } event Event object.
 */
const processEvent = (event) => {
  var body;
  if (process.env.STAGE !== "local"){
    body = JSON.parse(event.body);
  } else {
    body = event.body;
  }
  var { accountId, name, email, password } = body;
  if (!accountId){
    throw({ code: 400, message: 'missing Account Id'});
  }
  if (!name){
    throw({ code: 400, message: 'missing name'});
  }
  if (!email){
    throw({ code: 400, message: 'missing email'});
  }
  if (!password){
    throw({ code: 400, message: 'missing password'});
  }
  return { accountId, name, email, password };
}

const accountCreateHandler = async (event) => {
  try {
    //extract details from event
    var { accountId, name, email, password } = processEvent(event);

    //construct item
    var item = {
      accountId: accountId,
      name: name,
      emailAddress: email,
      password: password,
      verified: false
    };

    //insert item into table
    var dbRes = await insertItem(item);
    console.log(`Item Added: ${JSON.stringify(dbRes)}`);

    var emailRes = await sendOrderConfirmation({ ...item, ...{ callbackUrl: process.env.REST_SERVICE, srcEmailAddress: process.env.SRC_EMAIL_ADDRESS } });
    console.log(emailRes);

    //use email.js to send message
    return formatResponse(serialize(emailRes));

  } catch (e){
    // an error has occured. Log the error
    console.log(e);

    // format and return the error
    return formatError(e);
  }
};

module.exports = { accountCreateHandler, processEvent };