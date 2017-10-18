import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioIndexComponent } from './radio-index.component';

describe('RadioIndexComponent', () => {
  let component: RadioIndexComponent;
  let fixture: ComponentFixture<RadioIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
