import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyCanadaComponent } from './why-canada.component';

describe('WhyCanadaComponent', () => {
  let component: WhyCanadaComponent;
  let fixture: ComponentFixture<WhyCanadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyCanadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyCanadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
