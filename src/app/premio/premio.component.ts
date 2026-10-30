import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-premio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './premio.html',
  styleUrls: ['./premio.less']
})
export class PremioComponent {
  private readonly game = inject(GameService);

  readonly progress = this.game.correctAnswers;
  readonly totalPrize = this.game.totalPrize;

  readonly bonustrack = signal<boolean>(true);
  readonly extraPrize = signal<boolean>(false);
  readonly secretCode = signal<string>('P8QVYNER');

  check(value: string): void {
    if (value.trim().toLowerCase() === 'orbe') {
      this.hideBonusTrackSection();
      this.showExtraPrize();
    } else {
      alert('casiiii... empieza por la O y todos dicen que no existe.');
    }
  }

  checkCode(value: string): void {
    if (this.secretCode().toLowerCase() === value.trim().toLowerCase()) {
      alert('Código correcto');
    } else {
      alert('Fijate bien en las bolas doradas');
    }
  }

  hideBonusTrackSection(): void {
    this.bonustrack.set(false);
  }

  showExtraPrize(): void {
    this.extraPrize.set(true);
  }
}
