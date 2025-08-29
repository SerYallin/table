import { Router } from 'express';
import {
  getNumbers,
  getTotal,
  getSelected,
  updateSelected,
  updateNumbers,
} from '../controllers/numbers.controller';

const router = Router();

router.get('/numbers', getNumbers);
router.get('/numbers/:page', getNumbers);
router.get('/numbers/:page/:op/:value', getNumbers);

router.patch('/numbers', updateNumbers);

router.get('/total', getTotal);
router.get('/total/:op/:value', getTotal);

router.get('/selected', getSelected);
router.put('/selected', updateSelected);

export default router;
