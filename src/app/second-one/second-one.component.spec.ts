import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondOneComponent } from './second-one.component';

describe('SecondOneComponent', () => {
  let component: SecondOneComponent;
  let fixture: ComponentFixture<SecondOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
