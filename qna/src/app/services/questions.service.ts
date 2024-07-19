import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type QuestionType = {
  _id?: string;
  questions: string;
  answer: string;
  isEditing?: boolean,
  createdAt?: string;
  updatedAt?: string;
};

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<QuestionType[]> {
    return this.http
      .get('api/questions')
      .pipe(map((response: any) => response as QuestionType[]));
  }

  create(questionType: QuestionType): Observable<any> {
    return this.http.post<any>('api/questions/', questionType);
  }

  update(id: string, questionType: QuestionType): Observable<any> {
    return this.http.put<any>('api/questions/' + id, questionType);
  }

  deleteById(id: string): Observable<any> {
    return this.http.delete<any>('api/questions/' + id);
  }
}
