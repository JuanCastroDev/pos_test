// Modules
import { Router } from 'express';
import { body } from 'express-validator';

// Middlewares
import { validator } from '../middlewares/validator';

// Controllers
import { authPost } from '../controllers/auth.controller';

// Initialize
const router = Router();


router.post('/login', [
  body('email', 'Email is required').isEmail().isLength({ min: 10, max: 50 }),
  body('password', 'Password is required').isLength({ min: 5, max: 10 }),
  validator
], authPost);


export default router;
