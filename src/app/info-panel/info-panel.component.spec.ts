import { TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { InfoPanelComponent } from './info-panel.component';

describe('InfoPanelComponent', () => {
  let component: InfoPanelComponent;
  let componentRef: ComponentRef<InfoPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPanelComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(InfoPanelComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the info panel component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept signal input infoPanel', () => {
    componentRef.setInput('InfoPanel', true);
    expect(component.infoPanel()).toBeTrue();
  });
});
