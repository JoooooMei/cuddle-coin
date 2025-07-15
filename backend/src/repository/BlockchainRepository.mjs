import AppError from '../models/blockchain/appError.mjs';
import Blockchain from '../models/blockchain/Blockchain.mjs';
import Block from '../models/blockchain/Block.mjs';
import { transactionPool, wallet, server, blockChain } from '../server.mjs';
import blockchainModel from '../models/schema/blockchainModel.mjs';
import Miner from '../models/miner/Miner.mjs';

export default class BlockchainRepository {
  async mineTransactions() {
    const miner = new Miner({
      transactionPool,
      wallet,
      blockchain: blockChain,
      server,
    });

    miner.mineTransactions();

    await blockchainModel.deleteMany({});
    await blockchainModel.create(blockChain.chain);

    return miner;
  }

  async getAllTransactions() {
    return await blockchainModel.find();
  }
}
