const router = require('express').Router();
const Cakecoin = require('./../middleware/cakecoin.js');

const responseMiddleware = (req, res, next) => {
  return res.json(req.responseValue);
};

router.get('/chain', Cakecoin.getChain, responseMiddleware);

module.exports = router;
