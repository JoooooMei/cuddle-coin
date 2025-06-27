import { Router } from 'express';
import {
  addTransaction,
  getAllTransactions,
} from '../controllers/transaction-controller.mjs';

const router = Router();

router.route('/transactions').post(addTransaction).get(getAllTransactions);

export default router;
