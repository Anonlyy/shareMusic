import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentIndexComponent } from './content-index.component';

describe('ContentIndexComponent', () => {
  let component: ContentIndexComponent;
  let fixture: ComponentFixture<ContentIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
