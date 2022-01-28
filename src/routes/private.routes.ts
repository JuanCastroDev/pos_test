// Modules
import { Router } from 'express';
import { body, param } from 'express-validator';

// Middlewares
import { validator } from '../middlewares/validator';

// Controllers
import { getProducts, getOneProduct, newProduct, updateProduct, deleteProduct } from '../controllers/products.controller';
import { newInvoice, getInvoiceByDay } from '../controllers/invoice.controller';

// Initialize
const router = Router();


router.get('/products', getProducts);
router.get('/products/:id', [
  param('id').isNumeric().isLength({ max: 11 }),
  validator
], getOneProduct);
router.post('/products', [
  body('cod').isLength({ max: 20 }),
  body('name').isLength({ max: 50 }),
  body('count').isNumeric().isLength({ max: 11 }),
  body('value').isNumeric().isLength({ max: 10 }),
  validator
], newProduct);
router.put('/products/:id', [
  param('id').isNumeric().isLength({ max: 11 }),
  body('count').isNumeric().isLength({ max: 11 }),
  body('value').isNumeric().isLength({ max: 10 }),
  validator
], updateProduct);
router.delete('/products/:id', [
  param('id').isNumeric().isLength({ max: 11 }),
  validator
], deleteProduct);

router.get('/invoice/:date', getInvoiceByDay);
router.post('/invoice', newInvoice);


export default router;
