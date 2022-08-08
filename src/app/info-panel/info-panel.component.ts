import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';
import { Boda } from '../model';

@Component({
  selector: 'app-info-panel',
  templateUrl: 'info-panel.html',
  styleUrls: ['info-panel.less']
})
export class InfoPanelComponent implements OnInit, OnDestroy {

  datos: Array<Boda> = [];
  progress: number = 0;
  @Input() InfoPanel: boolean = false;
  subscription: Subscription | undefined;
  
  constructor(private game: GameService) { 
    this.datos = this.game.getQuestions();
  }

  ngOnInit(): void {
    this.subscription = this.game.currentProgress.subscribe(correctAnswers => this.progress = correctAnswers);
  }

  calcularPremio(i: number): number {
    return Math.floor(this.game.getUnitPrize() * (this.game.getTotalQuestion() -i));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
