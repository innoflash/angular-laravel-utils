import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaravelUtilsComponent } from './laravel-utils.component';

describe('LaravelUtilsComponent', () => {
  let component: LaravelUtilsComponent;
  let fixture: ComponentFixture<LaravelUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaravelUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaravelUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
