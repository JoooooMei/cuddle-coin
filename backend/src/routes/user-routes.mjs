import { Router } from 'express';
import {
  addUser,
  getAllUsers,
  getUser,
  deleteUser,
} from '../controllers/user-controller.mjs';

const router = Router();

router.route('/add').post(addUser);
router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).delete(deleteUser);

export default router;
