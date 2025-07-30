import { transactionPool, wallet, server, blockChain } from '../server.mjs';
import Miner from '../models/miner/Miner.mjs';
import Wallet from '../models/wallet/Wallet.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import BlockchainRepository from '../repository/BlockchainRepository.mjs';

export const addTransaction = catchErrorAsync(async (req, res) => {
  const { amount, recipient } = req.body;
  let transaction = transactionPool.transactionExists({
    address: wallet.publicKey,
  });

  if (transaction) {
    transaction.update({ sender: wallet, recipient, amount });
  } else {
    transaction = wallet.createTransaction({ recipient, amount });
  }

  transactionPool.addTransaction(transaction);
  server.broadcastTransaction(transaction);

  res.status(201).json({ success: true, statusCode: 201, data: transaction });
});

export const getWalletInfo = catchErrorAsync(async (req, res) => {
  const address = wallet.publicKey;
  const balance = Wallet.calculateBalance({
    chain: blockChain.chain,
    address: address,
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { address: address, balance: balance },
  });
});

export const getAllTransactions = catchErrorAsync(async (req, res) => {
  res.status(200).json({
    succsess: true,
    statusCode: 200,
    data: transactionPool.transactionMap,
  });
});

export const mineTransactions = catchErrorAsync(async (req, res) => {
  await new BlockchainRepository().mineTransactions();

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: 'Seems to work fine!',
  });
});
