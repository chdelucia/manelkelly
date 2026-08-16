import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../game.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { InfoPanelComponent } from '../info-panel/info-panel.component';

@Component({
  selector: 'app-concurso',
  standalone: true,
  imports: [FormsModule, PaginationComponent, InfoPanelComponent],
  templateUrl: './concurso.html',
  styleUrls: ['./concurso.less']
})
export class ConcursoComponent {
  private game = inject(GameService);

  inputValue = '';
  title = 'Manel & kelly';
  showInfoPanel = false;

  readonly data = this.game.currentQuestionObj;
  readonly premioAcumulado = this.game.jackpot;

  check(userAnswer: string): void {
    let msg = this.data().error || "Intentalo de nuevo";
    
    if (this.game.checkAnswer(userAnswer)) {
      msg = 'Respuesta correcta!'; 
      this.clearInput();
    }

    alert(msg);
  }

  toggleInfo(): void {
    this.showInfoPanel = !this.showInfoPanel;
  }

  clearInput(): void {
    this.inputValue = '';
  }
}
