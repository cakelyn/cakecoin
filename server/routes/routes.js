/*
TODO:
route for getting Cakecoin balance of a user
route for testing if chain is valid?
 */

const router = require('express').Router();
const Cakecoin = require('./../middleware/cakecoin.js');

const responseMiddleware = (req, res, next) => {
  return res.json(req.responseValue);
};

router.get('/chain', Cakecoin.getChain, responseMiddleware);
// curl http://127.0.0.1:1337/chain

router.post('/transaction', Cakecoin.newTransaction, responseMiddleware);
// curl -d '{ 'address1', 'address2', '100' }' -X POST http://127.0.0.1:1337/transaction

router.post('/mine', Cakecoin.mine, responseMiddleware);
// curl -d '{ 'address' }' -X POST http://127.0.0.1:1337/mine

module.exports = router;
