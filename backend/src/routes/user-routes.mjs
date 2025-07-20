import { Router } from 'express';
import {
  addUser,
  getAllUsers,
  getUser,
  deleteUser,
} from '../controllers/user-controller.mjs';
import { protect, authorize } from '../controllers/auth-controller.mjs';

const router = Router();

router.route('/add').post(addUser);
router.route('/').get(protect, authorize('admin'), getAllUsers);
router.route('/:id').get(protect, getUser).delete(protect, deleteUser);

export default router;
