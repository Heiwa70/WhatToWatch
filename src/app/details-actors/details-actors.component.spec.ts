import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsActorsComponent } from './details-actors.component';

describe('DetailsActorsComponent', () => {
  let component: DetailsActorsComponent;
  let fixture: ComponentFixture<DetailsActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsActorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
