import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../game.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { InfoPanelComponent } from '../info-panel/info-panel.component';

@Component({
  selector: 'app-concurso',
  standalone: true,
  imports: [FormsModule, PaginationComponent, InfoPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './concurso.html',
  styleUrls: ['./concurso.less']
})
export class ConcursoComponent {
  private readonly game = inject(GameService);

  readonly inputValue = signal<string>('');
  readonly title = signal<string>('Manel & kelly');
  readonly showInfoPanel = signal<boolean>(false);

  readonly data = this.game.currentQuestionObj;
  readonly premioAcumulado = this.game.jackpot;

  check(userAnswer: string): void {
    let msg = this.data().error || 'Intentalo de nuevo';
    
    if (this.game.checkAnswer(userAnswer)) {
      msg = 'Respuesta correcta!'; 
      this.clearInput();
    }

    alert(msg);
  }

  toggleInfo(): void {
    this.showInfoPanel.update(v => !v);
  }

  clearInput(): void {
    this.inputValue.set('');
  }
}
