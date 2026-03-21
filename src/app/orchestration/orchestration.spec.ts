import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orchestration } from './orchestration';

describe('Orchestration', () => {
  let component: Orchestration;
  let fixture: ComponentFixture<Orchestration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orchestration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orchestration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
