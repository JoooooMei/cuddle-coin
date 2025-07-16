import { blockChain } from '../server.mjs';
import { server } from '../server.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';

export const listAllBlocks = catchErrorAsync(async (req, res) => {
  res.status(200).json({ success: true, data: blockChain.chain });
});

export const addBlock = catchErrorAsync(async (req, res) => {
  const { data } = req.body;

  blockChain.addBlock({ data });

  server.broadcastChain();

  res
    .status(201)
    .json({ success: true, message: 'Block is added', data: blockChain.chain });
});
