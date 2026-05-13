import { Router } from 'express';
import { generateContent, getRecommendations } from '../controllers/aiController';

const router = Router();

router.post('/generate', generateContent);
router.get('/recommendations', getRecommendations);

export default router;
