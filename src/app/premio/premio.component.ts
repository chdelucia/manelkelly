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
  bonustrack = true;
  extraPrize = false;
  
  constructor(
    private game: GameService
  ) {}

  ngOnInit(): void {
    this.progress = this.game.getProgress()
  }

  check(value:string){
    if (value.toLocaleLowerCase() === "orbe") {
      this.hideBonusTrackSection();
      this.showExtraPrize();
    } else {
      alert('casiiii... empieza por la O y todos dicen que no existe.')
    }
  }

  hideBonusTrackSection() {
    this.bonustrack = false;
  }

  showExtraPrize() {
    this.extraPrize= true;
  }

}
