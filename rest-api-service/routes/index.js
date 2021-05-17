const express = require("express");
const router = express.Router();
const { accountValidator }  = require('../controllers/account-validator-controller');
const { accountCreate }  = require('../controllers/account-create-controller');

// POST request is made to /accounts
router.post("/accounts", accountCreate);

// POST request is made to /accounts/:accountId
router.post("/accounts/:accountId", accountValidator);

module.exports = router;