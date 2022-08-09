import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-premio',
  templateUrl: 'premio.html',
  styleUrls: ['premio.less']
})
export class PremioComponent implements OnInit {
  progress = 0
  totalPrize: number;
  bonustrack = true;
  extraPrize = false;
  secretCode = "P8QVYNER";
  
  constructor(
    private game: GameService
  ) {
    this.totalPrize = this.game.getTotalPrize();
  }

  ngOnInit(): void {
    this.progress = this.game.getProgress()
  }

  check(value:string){
    if (value.toLowerCase() === "orbe") {
      this.hideBonusTrackSection();
      this.showExtraPrize();
    } else {
      alert('casiiii... empieza por la O y todos dicen que no existe.')
    }
  }

  checkCode(value: string) {
    if(this.secretCode.toLowerCase() === value.toLowerCase()) {
      alert('Código correcto');
    } else {
      alert('Fijate bien en las bolas doradas');
    }
  }

  hideBonusTrackSection() {
    this.bonustrack = false;
  }

  showExtraPrize() {
    this.extraPrize= true;
  }

}
