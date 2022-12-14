import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: 'qr.html',
  styleUrls: ['qr.less']
})
export class QrComponent implements OnInit {
  tomorrow: Date = new Date();
  dates: Array<{weekday: string, day: string}> = [];
  selectedDay: any;
  msg: string = '';
  
  constructor() { }

  ngOnInit(): void {
    this.setNextSevenDays();
  }

  setNextSevenDays():void {
    for (let index = 0; index < 8; index++) {
      this.tomorrow.setDate(this.tomorrow.getDate()+1);
      const obj = {
        'weekday': this.tomorrow.toLocaleDateString('ES', { weekday: 'long' }),
        'day': this.tomorrow.toLocaleDateString('ES', { day: 'numeric' })
      }
      this.dates.push(obj);
    }
  }

  selectDay(date: {weekday: string, day: string}):void {
    this.selectedDay = date;
    this.setMsgWhatssap();
  }

  setMsgWhatssap(): void {
    let msg = `https://api.whatsapp.com/send?phone=+34600221298&text=`;
    let mgs2 = "🤣%20Parte%20final%20del%20reto🤣 "
    let data = `💸💸💸%20Nos%20vemos%20el%20*${this.selectedDay.weekday}*%20día%20*${this.selectedDay.day}*%20a%20las%20*19:30*%20💸💸💸`
    let result = msg + mgs2 + data;
    this.msg = result;
  }

}
