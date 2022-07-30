import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-premio',
  templateUrl: 'premio.html',
  styleUrls: ['premio.less']
})
export class PremioComponent implements OnInit {
  progress = 0
  premioTotal = environment.premioTotal
  
  constructor(
    private game: GameService
  ) {}

  ngOnInit(): void {
    this.progress = this.game.getProgress()
  }

}
