import mongoose from "mongoose";

const { Schema, model } = mongoose;

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

export default model("Question", schema);
