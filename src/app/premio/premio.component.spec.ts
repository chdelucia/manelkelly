import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PremioComponent } from './premio.component';

describe('PremioComponent', () => {
  beforeEach(async () => {
    spyOn(window, 'alert');
    await TestBed.configureTestingModule({
      imports: [PremioComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create premio component', () => {
    const fixture = TestBed.createComponent(PremioComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should reveal extra prize on correct bonus answer', () => {
    const fixture = TestBed.createComponent(PremioComponent);
    const component = fixture.componentInstance;
    expect(component.bonustrack()).toBeTrue();
    expect(component.extraPrize()).toBeFalse();

    component.check('orbe');

    expect(component.bonustrack()).toBeFalse();
    expect(component.extraPrize()).toBeTrue();
  });
});
