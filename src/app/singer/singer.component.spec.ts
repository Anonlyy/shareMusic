import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerComponent } from './singer.component';

describe('SingerComponent', () => {
  let component: SingerComponent;
  let fixture: ComponentFixture<SingerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
