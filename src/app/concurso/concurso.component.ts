import { Component, OnInit } from '@angular/core';
import { Boda } from '../model';
import { GameService } from '../game.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-concurso',
  templateUrl: 'concurso.html',
  styleUrls: ['concurso.less']
})
export class ConcursoComponent implements OnInit {

  constructor(private game: GameService) { 
    this.datos = this.game.getQuestions();
    this.preguntasTotales = this.datos.length;
    this.premioUnidad = environment.premioTotal / this.preguntasTotales;
    this.progress = this.game.getProgress();
  }
  preguntasTotales: number;
  premioUnidad: number;

  inputValue = '';
  title = 'Manel & kelly';
  datos: Array<Boda>;
  indice: number = 0;
  progress: number;
  premioAcumulado: number = 0;
  InfoPanel = false;

  ngOnInit(): void {
    this.calcularPremioAcumulado();
  }
  check(texto: string){
    let txt = this.datos[this.indice];
    if(texto.toLowerCase() === txt.respuesta.toLowerCase()){
      this.correctAnswer();
      this.calcularPremioAcumulado();
      this.next();
      this.clearInput();
    }
    else{
      let msg = txt.error || "Intentalo de nuevo";
      alert(msg);
    }
  }
  next():void{
    if(this.indice < this.datos.length - 1){
      this.indice++;
    }
  }
  prev():void{
    this.indice--;
  }

  move(i: number):void{
    this.indice = i;
  }

  correctAnswer():void{
    let txt = this.datos[this.indice];
    txt.success = true;
    alert('Respuesta correcta!');
    this.game.updateProgress()
    this.progress = this.game.getProgress();
  }

  calcularPremioAcumulado(){
    this.premioAcumulado = Math.floor(this.premioUnidad * this.progress);
  }
  calcularPremio(i: number): number {
   return Math.floor(this.premioUnidad * (this.datos.length -i));
  }

  toggleInfo(){
    this.InfoPanel = !this.InfoPanel
  }
  clearInput() {
    this.inputValue = '';
  }

}
