import { Router } from 'express';
import {
  getAllBlocks,
  getBlockByHash,
  createBlock,
} from '../controllers/blockchain-controller.mjs';

const blockchainRouter = Router();

blockchainRouter.route('/').get(getAllBlocks).post(createBlock);

blockchainRouter.route('/:hash').get(getBlockByHash);

export default blockchainRouter;
