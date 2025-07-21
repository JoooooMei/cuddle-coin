import { Router } from 'express';
import {
  addBlock,
  listAllBlocks,
} from '../controllers/blockchain-controller.mjs';
import { protect, authorize } from '../controllers/auth-controller.mjs';

const blockchainRouter = Router();

blockchainRouter.route('/').get(listAllBlocks);
blockchainRouter.route('/mine').post(protect, authorize('miner'), addBlock);

export default blockchainRouter;
