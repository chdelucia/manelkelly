import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import data from '../app/preguntas.json'; 
import { Boda } from './model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  progress = 0;
  totalPreguntas = data.length;

  constructor(private router: Router) { }
  
  getProgress():number {
    return this.progress;
  }
  updateProgress(){
    this.progress++;
    if (this.progress === this.totalPreguntas) { this.moveToCongratsPage() }
  }

  getQuestions(): Array<Boda> {
    return data;
  }

  moveToCongratsPage():void {
    this.router.navigate(['/premio']);
  }

}
