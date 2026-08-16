import { Component, Input, inject } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  templateUrl: './info-panel.html',
  styleUrls: ['./info-panel.less']
})
export class InfoPanelComponent {
  private game = inject(GameService);

  @Input() InfoPanel = false;

  readonly datos = this.game.questions;
  readonly progress = this.game.correctAnswers;

  calcularPremio(i: number): number {
    return Math.floor(this.game.getUnitPrize() * (this.game.getTotalQuestion() - i));
  }
}
