import { INITIAL_BALANCE } from '../../utilities/config.mjs';
import { keyMgr } from '../../utilities/keyManager.mjs';
import { createHash } from '../../utilities/hash.mjs';
import Transaction from './Transaction.mjs';

export default class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = keyMgr.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  static calculateBalance({ chain, address }) {
    let balance = INITIAL_BALANCE;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      for (let transaction of block.data) {
        if (transaction.input.address === address) {
          balance -= transaction.input.amount;
        }
        if (transaction.outputMap[address] !== undefined) {
          balance += transaction.outputMap[address];
        }
      }
    }

    return balance;
  }

  sign(data) {
    return this.keyPair.sign(createHash(data));
  }

  createTransaction({ recipient, amount, chain }) {
    if (chain) {
      this.balance = Wallet.calculateBalance({
        chain,
        address: this.publicKey,
      });
    }
    if (amount > this.balance) throw new Error('Insufficient founds');

    return new Transaction({ sender: this, recipient, amount });
  }
}
