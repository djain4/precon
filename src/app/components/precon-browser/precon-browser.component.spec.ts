import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreconBrowserComponent } from './precon-browser.component';

describe('PreconBrowserComponent', () => {
  let component: PreconBrowserComponent;
  let fixture: ComponentFixture<PreconBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreconBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreconBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
