const { accountValidatorHandler }  = require('../services/account-validator-service');

/*
 * call other imported services, or same service but different functions here if you need to
*/
const accountValidator = async (req, res) => {
    try {
      const resp = await accountValidatorHandler({
        pathParameters: req.params
      });
      res.status(resp.statusCode).redirect(resp.headers.Location);
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500);
    }
};

module.exports = {
  accountValidator
}