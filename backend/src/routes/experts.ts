import { Router } from 'express';
import { getExperts, getExpertById, createExpert } from '../controllers/expertController';

const router = Router();

router.get('/', getExperts);
router.get('/:id', getExpertById);
router.post('/', createExpert);

export default router;
