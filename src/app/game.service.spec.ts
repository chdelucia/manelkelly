import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GameService } from './game.service';
import { environment } from '../environments/environment';

describe('GameService', () => {
  let service: GameService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    localStorage.clear();
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        GameService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(GameService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize signals with correct defaults', () => {
    expect(service.questions().length).toBeGreaterThan(0);
    expect(service.currentQuestionID()).toBe(0);
    expect(service.correctAnswers()).toBe(0);
    expect(service.totalQuestions()).toBe(service.questions().length);
    expect(service.unitPrize()).toBe(service.totalPrize / service.totalQuestions());
    expect(service.jackpot()).toBe(0);
  });

  it('should get current question object accurately via computed signal', () => {
    const firstQ = service.questions()[0];
    expect(service.currentQuestionObj()).toEqual(firstQ);
    expect(service.getCurrentQuestionObj()).toEqual(firstQ);
  });

  it('should change current question ID when setQuestionID is called with valid index', () => {
    service.setQuestionID(1);
    expect(service.currentQuestionID()).toBe(1);
  });

  it('should not change question ID when setQuestionID is called with invalid index', () => {
    service.setQuestionID(1000);
    expect(service.currentQuestionID()).toBe(0);
  });

  it('should return false for incorrect answer', () => {
    const isCorrect = service.checkAnswer('wrong answer definitely');
    expect(isCorrect).toBeFalse();
    expect(service.correctAnswers()).toBe(0);
  });

  it('should return true for correct answer, update state and save to localstorage', () => {
    const currentQ = service.currentQuestionObj();
    const isCorrect = service.checkAnswer(currentQ.respuesta);

    expect(isCorrect).toBeTrue();
    expect(service.correctAnswers()).toBe(1);
    expect(service.questions()[0].success).toBeTrue();

    const saved = localStorage.getItem(environment.LocalStorageAnswersName);
    expect(saved).toContain(currentQ.id.toString());
  });

  it('should navigate to congrats page when all answers are answered correctly', () => {
    const questions = service.questions();
    questions.forEach((q, idx) => {
      service.setQuestionID(idx);
      service.checkAnswer(q.respuesta);
    });

    expect(service.correctAnswers()).toBe(questions.length);
    expect(service.jackpot()).toBe(service.totalPrize);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/premio']);
  });
});
