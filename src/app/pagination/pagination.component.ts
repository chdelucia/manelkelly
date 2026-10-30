import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.less']
})
export class PaginationComponent {
  private readonly game = inject(GameService);

  readonly datos = this.game.questions;
  readonly indice = this.game.currentQuestionID;

  changeQuestion(id: number): void {
    this.game.setQuestionID(id);
  }
}
