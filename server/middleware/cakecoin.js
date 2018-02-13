const Blockchain = require('./blockchain');
const { validationResult } = require('express-validator/check');

class Cakecoin {
  constructor() {
    this.blockchain = new Blockchain();

    this.getChain = this.getChain.bind(this);
    this.newTransaction = this.newTransaction.bind(this);
    this.mine = this.mine.bind(this);
  }

  getChain (req, res, next) {
    req.responseValue = {
      message: 'Get chain',
      chain: this.blockchain.chain
    }

    return next();
  }

  newTransaction (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    this.blockchain.createTransaction(req.body);
    req.responseValue = { message: 'Transaction will be added' };

    return next();
  }

  mine (req, res, next) {
    this.blockchain.minePendingTransactions();
    req.responseValue = { message: 'New block mined' };

    return next();
  }
}

module.exports = new Cakecoin();
