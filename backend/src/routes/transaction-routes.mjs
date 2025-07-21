import { Router } from 'express';
import {
  addTransaction,
  getWalletInfo,
  getAllTransactions,
  mineTransactions,
} from '../controllers/transaction-controller.mjs';
import { authorize, protect } from '../controllers/auth-controller.mjs';

const router = Router();

router
  .route('/transactions')
  .post(protect, addTransaction)
  .get(getAllTransactions);

router
  .route('/transactions/mine')
  .get(protect, authorize('miner'), mineTransactions);

router.route('/info').get(protect, getWalletInfo);

export default router;
