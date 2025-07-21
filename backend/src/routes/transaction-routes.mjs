import { Router } from 'express';
import {
  addTransaction,
  getWalletInfo,
  getAllTransactions,
  mineTransactions,
} from '../controllers/transaction-controller.mjs';
import { protect, authorize } from '../controllers/auth-controller.mjs';

const router = Router();

router
  .route('/transactions')
  .post(authorize, addTransaction)
  .get(getAllTransactions);
router.route('/transactions/mine').get(mineTransactions);
router.route('/info').get(getWalletInfo);

export default router;
