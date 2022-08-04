import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: 'qr.html',
  styleUrls: ['qr.less']
})
export class QrComponent implements OnInit {
  
  day: string = '';
  dayNumber: string = '';
  constructor() { }

  ngOnInit(): void {
    let date: Date = new Date();
    const first = date.getDate() - date.getDay() + 1;
    const last = first + 5;
    date.setDate(last);

    this.day = date.toLocaleDateString('ES', { weekday: 'long', month: 'long', day: 'numeric' });
    this.day = date.toLocaleDateString('ES', { weekday: 'long' });
    this.dayNumber = date.toLocaleDateString('ES', { day: 'numeric' });
  }

}
