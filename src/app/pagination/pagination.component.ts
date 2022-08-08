import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Boda } from '../model';

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.html',
  styleUrls: ['pagination.less']
})
export class PaginationComponent implements OnInit {
  datos: Array<Boda> = [];
  @Input() indice: number = 0;
  @Output() itemID = new EventEmitter<number>();

  
  constructor(private game: GameService) {
    this.datos = this.game.getQuestions();
   }

  changeQuestion(id: number) {
    this.game.setQuestionID(id);
    this.itemID.emit(id);
    
  }

  ngOnInit(): void {
  }

}
