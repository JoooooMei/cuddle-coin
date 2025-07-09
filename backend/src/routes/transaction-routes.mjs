import { Router } from 'express';
import {
  addTransaction,
  getWalletInfo,
  getAllTransactions,
  mineTransactions,
} from '../controllers/transaction-controller.mjs';

const router = Router();

router.route('/transactions').post(addTransaction).get(getAllTransactions);
router.route('/transactions/mine').get(mineTransactions);
router.route('/info').get(getWalletInfo);

export default router;
