import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import data from '../app/preguntas.json'; 
import { Boda } from './model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private messageSource = new BehaviorSubject(data[0]);
  currentMessage = this.messageSource.asObservable();

  private paginatorIdSource = new BehaviorSubject(0);
  currentPaginatorId = this.paginatorIdSource.asObservable();

  private correctAnswerSource = new BehaviorSubject(0);
  currentProgress = this.correctAnswerSource.asObservable();
  
  private correctAnswers = 0;
  private totalQuestions = data.length;
  private totalPrize = environment.totalPrize
  private unitPrize = environment.totalPrize / this.totalQuestions;
  private jackpot = 0;
  private currentQuestionID = 0;

  constructor(private router: Router) { }

  changeData(id: number = 0) {
    this.messageSource.next(data[id]);
  }

  changePaginatorID(id: number) {
    this.paginatorIdSource.next(id);
  }

  changeProgress() {
    this.correctAnswerSource.next(this.correctAnswers);
  }
  
  loadDataFromLocalStorage():void {
    const ans = localStorage.getItem(environment.LocalStorageAnswersName);
    let answers = ans?.split(',') || [];
    const isNotLoaded = answers.length !== this.correctAnswers;

    if( answers && isNotLoaded) {

      data.forEach( question => {
        if( answers.includes(question.id.toString()) ) {
          question.success = true;
          this.correctAnswers++;
        }
      });

      this.updateJackpot();
    }
  }

  saveProgressIntoLocalStorage():void {
    let ans = localStorage.getItem(environment.LocalStorageAnswersName);
    ans = ans ? ans + ',' + this.currentQuestionID : this.currentQuestionID.toString();

    localStorage.setItem(environment.LocalStorageAnswersName, ans );
  }


  setQuestionID(id:number) {
    this.currentQuestionID = id;
    this.changeData(id);
  }

  getCurrentQuestionObj():Boda {
    return data[this.currentQuestionID];
  }

  getProgress():number {
    return this.correctAnswers;
  }

  updateProgress():void {
    this.saveProgressIntoLocalStorage();
    this.correctAnswers++;
    this.currentQuestionID++;

    if (this.correctAnswers === this.totalQuestions) { 
      this.moveToCongratsPage() 
    }
  }

  getTotalQuestion():number {
    return this.totalQuestions;
  }

  getTotalPrize():number {
    return this.totalPrize;
  }

  getUnitPrize():number {
    return this.unitPrize;
  }

  getQuestions():Array<Boda> {
    return data;
  }

  moveToCongratsPage():void {
    this.router.navigate(['/premio']);
  }

  updateJackpot():void {
    if(this.jackpot === environment.totalPrize){
      return
    }
    this.jackpot = Math.floor(this.unitPrize * this.correctAnswers);
    this.changeProgress();
  }

  getJackpot():number {
    return this.jackpot;
  }

  checkAnswer(answer: string):boolean {
    let response = false;
    let currentQuestionObj = this.getCurrentQuestionObj();
    let expectedAnswer = currentQuestionObj.respuesta.toLowerCase();

    if(answer.toLowerCase() === expectedAnswer) {
      this.setQuestionAsResolved(currentQuestionObj);
      this.updateProgress();
      this.updateJackpot();
      this.changeData(this.currentQuestionID);
      this.changePaginatorID(this.currentQuestionID);
      
      response = true;
    } 

    return response;
  }

  setQuestionAsResolved(currentQuestion: Boda):void {
    currentQuestion.success = true;
  }

}
