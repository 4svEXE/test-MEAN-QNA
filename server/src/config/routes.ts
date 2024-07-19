import express from 'express';
import QuestionsCtrl from '../controllers/questionsCtrl';

const router = express.Router();

router.get('/questions', QuestionsCtrl.list);
router.post('/questions', QuestionsCtrl.create);
router.delete('/questions/:id', QuestionsCtrl.remove);
router.put('/questions/:id', QuestionsCtrl.update);

export default router;
