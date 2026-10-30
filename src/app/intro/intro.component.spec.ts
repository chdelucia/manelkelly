import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IntroComponent } from './intro.component';

describe('IntroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the intro component', () => {
    const fixture = TestBed.createComponent(IntroComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(IntroComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('The Wedding fund');
  });
});
