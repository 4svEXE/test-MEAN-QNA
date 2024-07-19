import Question from '../models/Question';

type QuestionData = {
  questions: string;
  answer: string;
  isEditing?: boolean;
};

export class QuestionsService {
  static async getQuestions() {
    try {
      const questions = await Question.find().lean();
      return questions.length > 0 ? questions : [];
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  }

  static async createQuestion(questionData: QuestionData) {
    try {
      const newQuestion = new Question(questionData);
      await newQuestion.save();
      return newQuestion;
    } catch (error) {
      console.error('Error creating question:', error);
      throw error;
    }
  }

  static async removeQuestion(id: string) {
    try {
      const deletedQuestion = await Question.findByIdAndDelete(id);
      if (!deletedQuestion) {
        throw new Error('Question not found');
      }
      return deletedQuestion;
    } catch (error) {
      console.error('Error removing question:', error);
      throw error;
    }
  }

  static async updateQuestion(id: string, questionData: QuestionData) {
    try {
      const updatedQuestion = await Question.findByIdAndUpdate(id, questionData, { new: true });
      if (!updatedQuestion) {
        throw new Error('Question not found');
      }
      return updatedQuestion;
    } catch (error) {
      console.error('Error updating question:', error);
      throw error;
    }
  }
}
