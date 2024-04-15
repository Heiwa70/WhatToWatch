import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnListComponent } from './btn-list.component';

describe('BtnListComponent', () => {
  let component: BtnListComponent;
  let fixture: ComponentFixture<BtnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
