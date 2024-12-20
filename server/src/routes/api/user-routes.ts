import express from 'express';
const router = express.Router();
import {
  createUser,
  getSingleUser,
  saveMenu,
  updateMenu,
  removeMenu,
  saveReservation,
  updateReservation,
  removeReservation,
  login,
} from '../../controllers/user-controller.js';

// import middleware
import { authenticateToken } from '../../services/auth.js';

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authenticateToken, saveMenu);

router.route('/login').post(login);

router.route('/user').get(authenticateToken, getSingleUser);

router.route('/menuItems/:menuId').put(authenticateToken, updateMenu);

router.route('/menuItems/:menuId').delete(authenticateToken, removeMenu);

router.route('/reservations/:reservationId').delete(authenticateToken, removeReservation);

router.route('/reservations/:reservationId').put(authenticateToken, updateReservation);

router.route('/reservations').post(authenticateToken, saveReservation);



export default router;
