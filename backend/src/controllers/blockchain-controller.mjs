import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import BlockchainRepository from '../repository/blockchainrepository.mjs';

const blockChain = new BlockchainRepository();

export const getAllBlocks = catchErrorAsync(async (req, res) => {
  const chain = await blockChain.getBlockchain();
  res.status(200).json({ success: true, data: chain });
});

export const getBlockByHash = catchErrorAsync(async (req, res) => {
  const block = await blockChain.find(req.params.hash);

  res.status(200).json({ success: true, data: block });
});

export const createBlock = catchErrorAsync(async (req, res) => {
  const block = await blockChain.add(req.body);

  res.status(201).json({
    success: true,
    message: 'Block added to blockchain',
    data: block,
  });
});
