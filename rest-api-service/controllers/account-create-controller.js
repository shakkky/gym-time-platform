const { accountCreateHandler }  = require('../services/account-create-service');

/*
 * call other imported services, or same service but different functions here if you need to
*/
const accountCreate = async (req, res) => {
    try {
      const resp = await accountCreateHandler(req);
      res.status(resp.statusCode).json(resp);
    } catch(e) {
      res.sendStatus(500);
    }
};

module.exports = {
  accountCreate
}