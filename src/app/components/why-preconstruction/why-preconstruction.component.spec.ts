import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyPreconstructionComponent } from './why-preconstruction.component';

describe('WhyPreconstructionComponent', () => {
  let component: WhyPreconstructionComponent;
  let fixture: ComponentFixture<WhyPreconstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyPreconstructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyPreconstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
