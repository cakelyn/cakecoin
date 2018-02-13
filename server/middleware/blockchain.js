/* TO DO:
 - when sending money, check senders balance is enough
 - implement way to create a new wallet
 - implement way to sign transactions (public/private key encryption)
 - minePendingTransactions get added to pendingTransactions, stop this and reward miner immediately

 * CREATE API:
 - /transactions/new creates a new transaction: Check the data being passed and call createTransaction. Could use middleware to check if the sender and recipient are correct and/or the transaction can be done (funds).
 - /mine tells server to mine a new block:
   1. Calculate proof of work
   2. Reward miner
   3. Forge new Block by adding it to the chain
 - /chain returns the full blockchain
 */

const Block = require('./block.js');
const Transaction = require('./transaction.js');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(0, 0, 'Hello world', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  createTransaction(transaction) {
    // there should be validation before adding to pending
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(miningRewardAddress) {
    let previousHash = this.getLatestBlock().hash;
    let block = new Block(this.chain.length, new Date(), this.pendingTransactions, previousHash);
    block.mineBlock();

    this.chain.push(block);

    // rather than push this to pending transactions
    // add to the block that is being created above
    // are there security issues with that solution?
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;

// const cakeCoin = new Blockchain();

// console.log(`CREATING SOME TRANSACTIONS...`);
// cakeCoin.createTransaction( new Transaction('address1', 'address2', 100));

// console.log(`STARTING MINER...`);
// cakeCoin.minePendingTransactions('kates-address');

// console.log(`START MINING AGAIN!`);
// cakeCoin.minePendingTransactions('kates-address');

// console.log(`BALANCE OF KATES ADDRESS IS ${cakeCoin.getBalanceOfAddress('kates-address')}`);
// console.log(cakeCoin);
