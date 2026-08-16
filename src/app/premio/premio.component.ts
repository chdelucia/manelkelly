import { Component, inject } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-premio',
  standalone: true,
  templateUrl: './premio.html',
  styleUrls: ['./premio.less']
})
export class PremioComponent {
  private game = inject(GameService);

  readonly progress = this.game.correctAnswers;
  readonly totalPrize = this.game.getTotalPrize();

  bonustrack = true;
  extraPrize = false;
  secretCode = "P8QVYNER";

  check(value: string): void {
    if (value.trim().toLowerCase() === "orbe") {
      this.hideBonusTrackSection();
      this.showExtraPrize();
    } else {
      alert('casiiii... empieza por la O y todos dicen que no existe.');
    }
  }

  checkCode(value: string): void {
    if (this.secretCode.toLowerCase() === value.trim().toLowerCase()) {
      alert('Código correcto');
    } else {
      alert('Fijate bien en las bolas doradas');
    }
  }

  hideBonusTrackSection(): void {
    this.bonustrack = false;
  }

  showExtraPrize(): void {
    this.extraPrize = true;
  }
}
