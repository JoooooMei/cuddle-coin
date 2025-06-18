import AppError from '../models/appError.mjs';
import Storage from '../models/Storage.mjs';
import Blockchain from '../models/Blockchain.mjs';
import Block from '../models/Block.mjs';

export default class BlockchainRepository {
  #storage = undefined;

  constructor() {
    this.#storage = new Storage('../data', 'blockchain.json');
    this.#storage.createFile(JSON.stringify([Block.genesis()])).then(() => {
      return;
    });
  }

  async getBlockchain() {
    const chain = JSON.parse(await this.#storage.readFromFile());
    const validatedChain = Blockchain.isValid(chain);
    return { validatedChain, chain };
  }

  async find(hash) {
    const chain = JSON.parse(await this.#storage.readFromFile());
    const block = Blockchain.find(chain, hash);
    if (!block) throw new AppError(`No block exists with hash: ${hash}`, 404);
    return block;
  }

  async add(block) {
    if (!block) throw new AppError('No data was provided', 400);

    const { data, message } = block;

    const chainData = JSON.parse(await this.#storage.readFromFile());
    const blockchain = new Blockchain();

    blockchain.chain = chainData;
    blockchain.addBlock({ data, message });

    await this.#storage.writeToFile(JSON.stringify(blockchain.chain));
    return blockchain.chain.at(-1);
  }
}
