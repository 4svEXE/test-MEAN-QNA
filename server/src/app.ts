import express from 'express';
import mongoose from 'mongoose';
import Router from './config/routes';
import rateLimit from 'express-rate-limit';

const app = express();
const port = process.env.PORT || 8080;
const dbURL = 'mongodb://localhost:27017/qna_db';

const createQuestionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many questions created from this IP, please try again later.',
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/', Router);
app.use('/', createQuestionLimiter);

const startServer = async () => {
  try {
    await mongoose.connect(dbURL, {});

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (e) {
    console.log('Failed to connect to MongoDB', e);
  }
};

startServer();
