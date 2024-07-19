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
Object.defineProperty(exports, "__esModule", { value: true });
const questionsService_1 = require("../services/questionsService");
const QuestionsCtrl = {
    list: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const questions = yield questionsService_1.QuestionsService.getQuestions();
            res.status(200).send(questions);
        }
        catch (e) {
            console.error('Failed to fetch questions', e);
            res.status(500).send({ message: 'Failed to fetch questions' });
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const question = req.body;
        console.log('question :>> ', question);
        try {
            const createdQuestion = yield questionsService_1.QuestionsService.createQuestion(question);
            res.status(200).send(createdQuestion);
        }
        catch (e) {
            console.error('Failed to create question', e);
            res.status(500).send({ message: 'Failed to create question' });
        }
    }),
    remove: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield questionsService_1.QuestionsService.removeQuestion(id);
            res.status(200).send();
        }
        catch (e) {
            console.error('Failed to remove question', e);
            res.status(500).send();
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const question = req.body;
        try {
            const updatedQuestion = yield questionsService_1.QuestionsService.updateQuestion(id, question);
            res.status(200).send(updatedQuestion);
        }
        catch (e) {
            console.error('Failed to update question', e);
            res.status(500).send();
        }
    })
};
exports.default = QuestionsCtrl;
//# sourceMappingURL=questionsCtrl.js.map