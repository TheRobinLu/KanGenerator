import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbversionComponent } from './dbversion.component';

describe('DbversionComponent', () => {
  let component: DbversionComponent;
  let fixture: ComponentFixture<DbversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
