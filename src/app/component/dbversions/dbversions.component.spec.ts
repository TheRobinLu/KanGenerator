import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbversionsComponent } from './dbversions.component';

describe('DbversionsComponent', () => {
  let component: DbversionsComponent;
  let fixture: ComponentFixture<DbversionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbversionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbversionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
