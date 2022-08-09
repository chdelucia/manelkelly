import { Component, OnInit, OnDestroy } from '@angular/core';
import { Boda } from '../model';
import { GameService } from '../game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-concurso',
  templateUrl: 'concurso.html',
  styleUrls: ['concurso.less']
})
export class ConcursoComponent implements OnInit, OnDestroy {

  inputValue = '';
  title = 'Manel & kelly';
  data: Boda;
  showInfoPanel = false;

  constructor(private game: GameService) { 
    this.data = this.game.getCurrentQuestionObj();
  }

  premioAcumulado: number = 0;
  subscription: Subscription | undefined;
  

  ngOnInit():void {
    this.subscription = this.game.currentMessage.subscribe(message => this.data = message);
    this.premioAcumulado = this.game.getJackpot();
  }

  check(userAnswer: string):void {
    let msg = this.data.error || "Intentalo de nuevo";
    
    if(this.game.checkAnswer(userAnswer) ) {
      this.correctAnswer();
      msg = 'Respuesta correcta!'; 
    } 

    alert(msg)
  }

  correctAnswer():void {
    this.premioAcumulado = this.game.getJackpot()
    this.clearInput();
  }

  toggleInfo():void {
    this.showInfoPanel = !this.showInfoPanel
  }

  clearInput():void {
    this.inputValue = '';
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
