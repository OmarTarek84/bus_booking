import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookSeatsComponent } from './user-book-seats.component';

describe('UserBookSeatsComponent', () => {
  let component: UserBookSeatsComponent;
  let fixture: ComponentFixture<UserBookSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
