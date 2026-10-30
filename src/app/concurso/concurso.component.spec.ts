import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConcursoComponent } from './concurso.component';

describe('ConcursoComponent', () => {
  beforeEach(async () => {
    spyOn(window, 'alert');
    await TestBed.configureTestingModule({
      imports: [ConcursoComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the concurso component', () => {
    const fixture = TestBed.createComponent(ConcursoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should toggle info panel signal state', () => {
    const fixture = TestBed.createComponent(ConcursoComponent);
    const component = fixture.componentInstance;
    expect(component.showInfoPanel()).toBeFalse();
    component.toggleInfo();
    expect(component.showInfoPanel()).toBeTrue();
  });

  it('should clear input value signal', () => {
    const fixture = TestBed.createComponent(ConcursoComponent);
    const component = fixture.componentInstance;
    component.inputValue.set('testing input');
    component.clearInput();
    expect(component.inputValue()).toBe('');
  });
});
