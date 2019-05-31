import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableRoutesComponent } from './available-routes.component';

describe('AvailableRoutesComponent', () => {
  let component: AvailableRoutesComponent;
  let fixture: ComponentFixture<AvailableRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
