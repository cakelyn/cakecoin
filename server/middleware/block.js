/* TO DO:
 * is index necessary?
 * is a proof variable necessary?
 */

const SHA56 = require('crypto-js/sha256');
require('dotenv').config();

class Block {
  constructor(index, timestamp, transactions, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.proof = 0;
  }

  calculateHash() {
    return SHA56(
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.proof
    ).toString();
  }

  mineBlock() {
    while (this.hash.slice(0, process.env.VALID_PROOF.length) !== process.env.VALID_PROOF) {
      this.proof++;
      this.hash = this.calculateHash();
    }

    console.log(`BLOCK MINED: ${this.hash}`);
  }
}

module.exports = Block;
