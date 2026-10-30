import { TestBed } from '@angular/core/testing';
import { QrComponent } from './qr.component';

describe('QrComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrComponent]
    }).compileComponents();
  });

  it('should create qr component and initialize dates', () => {
    const fixture = TestBed.createComponent(QrComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.dates().length).toBe(8);
  });

  it('should compute whatsapp message when day is selected', () => {
    const fixture = TestBed.createComponent(QrComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.msg()).toBe('');

    const firstDate = component.dates()[0];
    component.selectDay(firstDate);

    expect(component.msg()).toContain('https://api.whatsapp.com/send?phone=+34600221298');
    expect(component.msg()).toContain(firstDate.weekday);
  });
});
