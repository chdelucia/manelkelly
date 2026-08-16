import { Component, inject } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.less']
})
export class PaginationComponent {
  private game = inject(GameService);

  readonly datos = this.game.questions;
  readonly indice = this.game.currentQuestionID;

  changeQuestion(id: number): void {
    this.game.setQuestionID(id);
  }
}
