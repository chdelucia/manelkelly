import { Component, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';

export interface DateOption {
  weekday: string;
  day: string;
}

@Component({
  selector: 'app-qr',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './qr.html',
  styleUrls: ['./qr.less']
})
export class QrComponent implements OnInit {
  readonly dates = signal<DateOption[]>([]);
  readonly selectedDay = signal<DateOption | null>(null);

  readonly msg = computed(() => {
    const day = this.selectedDay();
    if (!day) return '';
    const base = 'https://api.whatsapp.com/send?phone=+34600221298&text=';
    const mgs2 = '🤣%20Parte%20final%20del%20reto🤣 ';
    const data = `💸💸💸%20Nos%20vemos%20el%20*${day.weekday}*%20día%20*${day.day}*%20a%20las%20*19:30*%20💸💸💸`;
    return base + mgs2 + data;
  });

  ngOnInit(): void {
    this.setNextSevenDays();
  }

  setNextSevenDays(): void {
    const today = new Date();
    const list: DateOption[] = [];
    for (let index = 0; index < 8; index++) {
      const day = new Date(today);
      day.setDate(today.getDate() + index + 1);
      const obj: DateOption = {
        weekday: day.toLocaleDateString('es-ES', { weekday: 'long' }),
        day: day.toLocaleDateString('es-ES', { day: 'numeric' })
      };
      list.push(obj);
    }
    this.dates.set(list);
  }

  selectDay(date: DateOption): void {
    this.selectedDay.set(date);
  }
}
