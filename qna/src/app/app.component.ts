import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsService, QuestionType } from './services/questions.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'qna';
  questionsData: QuestionType[] = [];
  isEditQuestion = false;
  editableQuestion?: QuestionType;

  private pollingSubscription: Subscription = new Subscription();

  formGroup = new FormGroup({
    questions: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(420),
    ]),
    answer: new FormControl('', [Validators.maxLength(420)]),
  });

  constructor(private questionsService: QuestionsService) {}

  ngOnInit() {
    this.loadQuestions();
    this.pollingSubscription.add(
      interval(500).subscribe(() => this.loadQuestions())
    );
  }

  ngOnDestroy() {
    this.pollingSubscription.unsubscribe();
  }

  loadQuestions() {
    this.questionsService.getAll().subscribe(
      (data: QuestionType[]) => {
        this.questionsData = data;
      },
      (error) => {
        console.error('Error fetching questions');
      }
    );
  }

  addQuestion() {
    if (this.formGroup.invalid) return;

    this.formGroup.markAllAsTouched();

    const newQuestion: QuestionType = {
      questions: this.formGroup.get('questions')?.value || '',
      answer: this.formGroup.get('answer')?.value || '',
    };

    this.questionsService.create(newQuestion).subscribe(
      (data: QuestionType) => {
        this.questionsData.push(data);
        this.formGroup.reset();
      },
      (error) => {
        console.error('Error adding question:', error);
      }
    );
  }

  editQuestion(question: QuestionType) {
    console.log('question.isEditing :>> ', question.isEditing);
    if (question.isEditing || this.isEditQuestion)
      return alert('Someone are already editing a question');



    this.isEditQuestion = true;
    this.editableQuestion = question;

    this.updateAsEditing()

    this.formGroup.setValue({
      questions: question.questions,
      answer: question.answer,
    });

    console.log('question :>> ', question);
  }

  updateAsEditing() {
    this.editableQuestion.isEditing = true;

    this.questionsService
      .update(this.editableQuestion._id!, this.editableQuestion)
      .subscribe(
        (data: QuestionType) => {},
        (error) => {
          console.error('Error updating question:', error);
        }
      );
  }

  discardChanges() {
    this.isEditQuestion = false;
    this.formGroup.reset();
  }

  saveQuestion() {
    if (!this.formGroup.valid || !this.editableQuestion) return;

    const updatedQuestion: QuestionType = {
      ...this.editableQuestion,
      questions: this.formGroup.get('questions')?.value || '',
      answer: this.formGroup.get('answer')?.value || '',
      isEditing: false,
    };

    this.questionsService
      .update(this.editableQuestion._id!, updatedQuestion)
      .subscribe(
        (data: QuestionType) => {
          this.questionsData = this.questionsData.map((q) =>
            q._id === data._id ? data : q
          );
          this.discardChanges();
        },
        (error) => {
          console.error('Error updating question:', error);
        }
      );
  }

  deleteQuestion(question: QuestionType) {
    if (!confirm('Are you sure you want to delete this question?')) return;

    this.questionsService.deleteById(question._id!).subscribe(
      () => {
        this.questionsData = this.questionsData.filter(
          (q) => q._id !== question._id
        );
      },
      (error) => {
        console.error('Error deleting question:', error);
      }
    );
  }
}
