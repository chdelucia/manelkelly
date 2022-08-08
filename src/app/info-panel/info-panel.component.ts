import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Boda } from '../model';

@Component({
  selector: 'app-info-panel',
  templateUrl: 'info-panel.html',
  styleUrls: ['info-panel.less']
})
export class InfoPanelComponent implements OnInit {

  datos: Array<Boda> = [];
  @Input() progress: number = 0;
  @Input() InfoPanel: boolean = false;
  
  constructor(private game: GameService) { 
    this.datos = this.game.getQuestions();
  }

  ngOnInit(): void {
  }

  calcularPremio(i: number): number {
    return Math.floor(this.game.getUnitPrize() * (this.game.getTotalQuestion() -i));
   }

}
