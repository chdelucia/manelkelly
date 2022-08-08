import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';
import { Boda } from '../model';

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.html',
  styleUrls: ['pagination.less']
})
export class PaginationComponent implements OnInit, OnDestroy {
  datos: Array<Boda> = [];
  indice: number = 0;
  subscription: Subscription | undefined;

  constructor(private game: GameService) {
    this.datos = this.game.getQuestions();
   }

  changeQuestion(id: number) {
    this.game.setQuestionID(id);
    this.indice = id;
  }

  ngOnInit(): void {
    this.subscription = this.game.currentPaginatorId.subscribe(id => this.indice = id);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
