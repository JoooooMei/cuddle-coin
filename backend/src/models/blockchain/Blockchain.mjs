import { createHash } from '../../utilities/hash.mjs';
import Block from './Block.mjs';
import Transaction from '../wallet/Transaction.mjs';
import Wallet from '../wallet/Wallet.mjs';
import { REWARD_ADDRESS, MINING_REWARD } from '../../utilities/config.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
    // this.chain.push(Block.genesis())
  }

  addBlock({ data, message }) {
    console.log('Body igen: ', data, message);
    const addedBlock = Block.mineBlock({
      previousBlock: this.chain.at(-1),
      data,
      message,
    });
    this.chain.push(addedBlock);
  }

  replaceChain(chain, shouldValidate, callback) {
    if (chain.length <= this.chain.length) {
      return;
    }
    if (!Blockchain.isValid(chain)) {
      return;
    }

    if (shouldValidate && !this.validateTransactionData({ chain: chain })) {
      console.error('The chain contain invalid data');
      return;
    }

    if (callback) callback();

    this.chain = chain;
  }

  validateTransactionData({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const transactionSet = new Set();
      let rewardCount = 0;

      for (let transaction of block.data) {
        if (transaction.input.address === REWARD_ADDRESS.address) {
          rewardCount += 1;

          if (rewardCount > 1) {
            return false;
          }

          console.log('recipient: ', Object.values(transaction.outputMap)[0]);

          if (Object.values(transaction.outputMap)[0] !== MINING_REWARD) {
            console.error('Invalid mining reward');
            return false;
          }
        } else {
          if (!Transaction.validate(transaction)) {
            console.error('invalid transaction');
            return false;
          }

          const correctBalance = Wallet.calculateBalance({
            chain: this.chain,
            address: transaction.input.address,
          });

          if (transaction.input.amount !== correctBalance) {
            console.error('Wrong input amount: balance');
            return false;
          }

          if (transactionSet.has(transaction)) {
            console.error('Transaction already exists in the block');
            return false;
          } else {
            transactionSet.add(transaction);
          }
        }
      }
    }

    return true;
  }

  static isValid(chain) {
    if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, data, hash, lastHash, nonce, difficulty, message } =
        chain.at(i);
      const prevHash = chain[i - 1].hash;

      if (lastHash !== prevHash) return false;

      const validHash = createHash(
        timestamp,
        data,
        lastHash,
        nonce,
        difficulty,
        message
      );
      if (hash !== validHash) return false;
    }

    return true;
  }

  static find(chain, hash) {
    return chain.find((block) => block.hash === hash);
  }
}
