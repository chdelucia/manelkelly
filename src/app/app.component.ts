import { Component, OnInit } from '@angular/core';
import { Boda } from './model';
import data from '../app/preguntas.json'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit  {
  title = 'manelkelly';
  datos: Array<Boda> = data;
  indice: number = 0;

  ngOnInit(): void {
    console.log(this.datos);
  }
  check(texto: string){
    if(texto === this.datos[0].respuesta){
      this.datos[this.indice].success = true;
      console.log(this.datos);
    }
  }
  next(){
    this.indice++;
  }
  prev(){
    this.indice--;
  }

}
