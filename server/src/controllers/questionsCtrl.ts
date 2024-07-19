import { Request, Response } from 'express';
import { QuestionsService } from '../services/questionsService';

const QuestionsCtrl = {
  list: async (req: Request, res: Response) => {
    try {
      const questions = await QuestionsService.getQuestions();
      res.status(200).send(questions);
    } catch (e) {
      console.error('Failed to fetch questions', e);
      res.status(500).send({message: 'Failed to fetch questions'});
    }
  },

  create: async (req: Request, res: Response) => {
    const question = req.body;
    console.log('question :>> ', question);
    try {
      const createdQuestion = await QuestionsService.createQuestion(question);
      res.status(200).send(createdQuestion);
    } catch (e) {
      console.error('Failed to create question', e);
      res.status(500).send({message: 'Failed to create question'});
    }
  },

  remove: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await QuestionsService.removeQuestion(id);
      res.status(200).send();
    } catch (e) {
      console.error('Failed to remove question', e);
      res.status(500).send();
    }
  },

  update: async (req: Request, res: Response) => {
    const id = req.params.id;
    const question = req.body;
    try {
      const updatedQuestion = await QuestionsService.updateQuestion(id, question);
      res.status(200).send(updatedQuestion);
    } catch (e) {
      console.error('Failed to update question', e);
      res.status(500).send();
    }
  }
};

export default QuestionsCtrl;
