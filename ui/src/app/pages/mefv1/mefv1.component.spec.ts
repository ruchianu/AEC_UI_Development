import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mefv1Component } from './mefv1.component';

describe('Mefv1Component', () => {
  let component: Mefv1Component;
  let fixture: ComponentFixture<Mefv1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mefv1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Mefv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

