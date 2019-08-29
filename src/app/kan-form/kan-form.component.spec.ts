import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanFormComponent } from './kan-form.component';

describe('KanFormComponent', () => {
  let component: KanFormComponent;
  let fixture: ComponentFixture<KanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
