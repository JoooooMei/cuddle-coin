import { createHash } from '../utilities/hash.mjs';
import Block from './Block.mjs';

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

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      return;
    }

    if (!Blockchain.isValid(chain)) {
      return;
    }

    this.chain = chain;
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
