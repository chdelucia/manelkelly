import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './info-panel.html',
  styleUrls: ['./info-panel.less']
})
export class InfoPanelComponent {
  private readonly game = inject(GameService);

  readonly infoPanel = input<boolean>(false, { alias: 'InfoPanel' });

  readonly datos = this.game.questions;
  readonly progress = this.game.correctAnswers;

  calcularPremio(i: number): number {
    return Math.floor(this.game.unitPrize() * (this.game.totalQuestions() - i));
  }
}
