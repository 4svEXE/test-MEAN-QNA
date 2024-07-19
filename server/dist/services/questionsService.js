"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const Question_1 = __importDefault(require("../models/Question"));
class QuestionsService {
    static getQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questions = yield Question_1.default.find().lean();
                return questions.length > 0 ? questions : [];
            }
            catch (error) {
                console.error('Error fetching questions:', error);
                return [];
            }
        });
    }
    static createQuestion(questionData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newQuestion = new Question_1.default(questionData);
                yield newQuestion.save();
                return newQuestion;
            }
            catch (error) {
                console.error('Error creating question:', error);
                throw error;
            }
        });
    }
    static removeQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedQuestion = yield Question_1.default.findByIdAndDelete(id);
                if (!deletedQuestion) {
                    throw new Error('Question not found');
                }
                return deletedQuestion;
            }
            catch (error) {
                console.error('Error removing question:', error);
                throw error;
            }
        });
    }
    static updateQuestion(id, questionData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedQuestion = yield Question_1.default.findByIdAndUpdate(id, questionData, { new: true });
                if (!updatedQuestion) {
                    throw new Error('Question not found');
                }
                return updatedQuestion;
            }
            catch (error) {
                console.error('Error updating question:', error);
                throw error;
            }
        });
    }
}
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questionsService.js.map