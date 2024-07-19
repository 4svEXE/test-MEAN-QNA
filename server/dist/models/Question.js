"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const schema = new Schema({
    questions: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
    },
    isEditing: {
        type: Boolean,
        default: false,
    }
});
exports.default = model("Question", schema);
//# sourceMappingURL=Question.js.map