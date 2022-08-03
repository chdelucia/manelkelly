import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: 'qr.html',
  styles: [
  ]
})
export class QrComponent implements OnInit {
  
  day: string = '';
  constructor() { }

  ngOnInit(): void {
    let date: Date = new Date();
    const first = date.getDate() - date.getDay() + 1;
    const last = first + 5;
    date.setDate(last);

    this.day = date.toLocaleDateString('ES', { weekday: 'long', month: 'long', day: 'numeric' });
  }

}
