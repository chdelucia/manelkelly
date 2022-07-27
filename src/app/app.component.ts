import { Component, OnInit } from '@angular/core';
import { Boda } from './model';
import data from '../app/preguntas.json'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit  {
  premioTotal = 1260000;
  preguntasTotales = data.length;
  premioUnidad = this.premioTotal / this.preguntasTotales;

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
    if(texto.toLowerCase() === txt.respuesta){
      this.correctAnswer();
      this.calcularPremioAcumulado();
      this.next();
    }
    else{
      let msg = txt.error || "Intentalo de nuevo";
      alert(msg)
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
    this.premioAcumulado = this.premioUnidad * this.progress;
  }

  toggleInfo(){
    this.InfoPanel = !this.InfoPanel
  }

}
