import { Component, OnInit } from '@angular/core';
import { Boda } from '../model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-concurso',
  templateUrl: 'concurso.html',
  styleUrls: ['concurso.less']
})
export class ConcursoComponent implements OnInit {

  inputValue = '';
  title = 'Manel & kelly';
  data: Boda;
  showInfoPanel = false;

  constructor(private game: GameService) { 
    this.data = this.game.getCurrentQuestionObj();
    this.progress = this.game.getProgress();
  }

  indice: number = 0;
  progress: number;
  premioAcumulado: number = 0;
  

  ngOnInit():void {
    this.game.updateJackpot();
  }

  check(userAnswer: string):void {
    let msg = this.data.error || "Intentalo de nuevo";
    
    if(this.game.checkAnswer(userAnswer) ) {
      this.correctAnswer();
      msg = 'Respuesta correcta!'; 
    } 

    alert(msg)
  }

  next():void {
    if(this.indice < this.game.getTotalQuestion() - 1){
      this.indice++;
      this.data = this.getCurrentQuestionObj();
    }
  }

  prev():void{
    this.indice--;
  }

  move(id: number):void {
    this.indice = id;
    this.data = this.getCurrentQuestionObj();
    
  }

  correctAnswer():void {
    this.premioAcumulado = this.game.getJackpot()
    this.progress = this.game.getProgress();
    this.clearInput();
    this.next();
  }

  toggleInfo():void {
    this.showInfoPanel = !this.showInfoPanel
  }
  clearInput():void {
    this.inputValue = '';
  }

  //TODO change to emitbehivour
  getCurrentQuestionObj(): Boda {
    return this.game.getCurrentQuestionObj();
  }

}
