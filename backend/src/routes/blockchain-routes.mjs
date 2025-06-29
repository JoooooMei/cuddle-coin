import { Router } from 'express';
import {
  addBlock,
  listAllBlocks,
} from '../controllers/blockchain-controller.mjs';

const blockchainRouter = Router();

blockchainRouter.route('/').get(listAllBlocks).post(addBlock);

export default blockchainRouter;
