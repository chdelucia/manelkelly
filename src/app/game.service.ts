import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import rawData from './preguntas.json';
import { Boda } from './model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private router = inject(Router);

  readonly questions = signal<Boda[]>(JSON.parse(JSON.stringify(rawData)));
  readonly currentQuestionID = signal<number>(0);
  readonly correctAnswers = signal<number>(0);

  readonly totalQuestions = computed(() => this.questions().length);
  readonly totalPrize = environment.totalPrize;
  readonly unitPrize = computed(() => this.totalPrize / (this.totalQuestions() || 1));

  readonly jackpot = computed(() => {
    if (this.correctAnswers() === this.totalQuestions() && this.totalQuestions() > 0) {
      return this.totalPrize;
    }
    return Math.floor(this.unitPrize() * this.correctAnswers());
  });

  readonly currentQuestionObj = computed(() => {
    const list = this.questions();
    const id = this.currentQuestionID();
    return list[id] || list[0];
  });

  constructor() {
    this.loadDataFromLocalStorage();
  }

  loadDataFromLocalStorage(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const ans = localStorage.getItem(environment.LocalStorageAnswersName);
    if (!ans) return;

    const savedIds = new Set(ans.split(',').filter(Boolean).map(id => id.trim()));
    let count = 0;

    const updatedQuestions = this.questions().map(q => {
      if (savedIds.has(q.id.toString())) {
        count++;
        return { ...q, success: true };
      }
      return q;
    });

    this.questions.set(updatedQuestions);
    this.correctAnswers.set(count);

    if (updatedQuestions[this.currentQuestionID()]?.success) {
      const nextUnsolvedIndex = updatedQuestions.findIndex(q => !q.success);
      if (nextUnsolvedIndex !== -1) {
        this.currentQuestionID.set(nextUnsolvedIndex);
      } else if (count === updatedQuestions.length) {
        this.currentQuestionID.set(updatedQuestions.length - 1);
      }
    }
  }

  saveProgressIntoLocalStorage(questionId: number): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    let ans = localStorage.getItem(environment.LocalStorageAnswersName);
    const idStr = questionId.toString();
    if (ans) {
      const existing = ans.split(',');
      if (!existing.includes(idStr)) {
        ans = `${ans},${idStr}`;
      }
    } else {
      ans = idStr;
    }
    localStorage.setItem(environment.LocalStorageAnswersName, ans);
  }

  setQuestionID(id: number): void {
    if (id >= 0 && id < this.questions().length) {
      this.currentQuestionID.set(id);
    }
  }

  getCurrentQuestionObj(): Boda {
    return this.currentQuestionObj();
  }

  getProgress(): number {
    return this.correctAnswers();
  }

  getTotalQuestion(): number {
    return this.totalQuestions();
  }

  getTotalPrize(): number {
    return this.totalPrize;
  }

  getUnitPrize(): number {
    return this.unitPrize();
  }

  getQuestions(): Boda[] {
    return this.questions();
  }

  getJackpot(): number {
    return this.jackpot();
  }

  checkAnswer(userAnswer: string): boolean {
    if (!userAnswer) return false;

    const currentObj = this.currentQuestionObj();
    const expected = currentObj.respuesta.trim().toLowerCase();
    const actual = userAnswer.trim().toLowerCase();

    if (actual === expected) {
      const qId = currentObj.id;

      const updatedList = this.questions().map(q =>
        q.id === qId ? { ...q, success: true } : q
      );
      this.questions.set(updatedList);
      this.saveProgressIntoLocalStorage(qId);

      const newCorrectCount = updatedList.filter(q => q.success).length;
      this.correctAnswers.set(newCorrectCount);

      if (newCorrectCount === this.totalQuestions()) {
        this.moveToCongratsPage();
      } else {
        let nextId = (this.currentQuestionID() + 1) % this.totalQuestions();
        if (updatedList[nextId]?.success) {
          const unsolvedIndex = updatedList.findIndex(q => !q.success);
          if (unsolvedIndex !== -1) {
            nextId = unsolvedIndex;
          }
        }
        this.currentQuestionID.set(nextId);
      }

      return true;
    }

    return false;
  }

  moveToCongratsPage(): void {
    this.router.navigate(['/premio']);
  }
}
