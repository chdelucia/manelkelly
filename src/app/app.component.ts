import { Component, OnInit } from '@angular/core';
import { Boda } from './model';
import data from '../app/preguntas.json'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit  {
  pppremioTotal = 1260000;
  premioTotal = 300;
  preguntasTotales = data.length;
  premioUnidad = this.premioTotal / this.preguntasTotales;

  inputValue = '';
  title = 'manelkelly';
  datos: Array<Boda> = data;
  indice: number = 0;
  progress: number = 0;
  premioAcumulado: number = this.premioUnidad * this.progress;
  InfoPanel = false;

  ngOnInit(): void {
    console.log(this.datos.length);
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
    this.progress++;
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
