import { Component, OnInit } from '@angular/core';

interface DateOption {
  weekday: string;
  day: string;
}

@Component({
  selector: 'app-qr',
  standalone: true,
  templateUrl: './qr.html',
  styleUrls: ['./qr.less']
})
export class QrComponent implements OnInit {
  dates: DateOption[] = [];
  selectedDay: DateOption | null = null;
  msg = '';

  ngOnInit(): void {
    this.setNextSevenDays();
  }

  setNextSevenDays(): void {
    const today = new Date();
    for (let index = 0; index < 8; index++) {
      const day = new Date(today);
      day.setDate(today.getDate() + index + 1);
      const obj: DateOption = {
        weekday: day.toLocaleDateString('es-ES', { weekday: 'long' }),
        day: day.toLocaleDateString('es-ES', { day: 'numeric' })
      };
      this.dates.push(obj);
    }
  }

  selectDay(date: DateOption): void {
    this.selectedDay = date;
    this.setMsgWhatsapp();
  }

  setMsgWhatsapp(): void {
    if (!this.selectedDay) return;
    const msg = `https://api.whatsapp.com/send?phone=+34600221298&text=`;
    const mgs2 = "🤣%20Parte%20final%20del%20reto🤣 ";
    const data = `💸💸💸%20Nos%20vemos%20el%20*${this.selectedDay.weekday}*%20día%20*${this.selectedDay.day}*%20a%20las%20*19:30*%20💸💸💸`;
    this.msg = msg + mgs2 + data;
  }
}
