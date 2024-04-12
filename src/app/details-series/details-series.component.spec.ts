import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSeriesComponent } from './details-series.component';

describe('DetailsSeriesComponent', () => {
  let component: DetailsSeriesComponent;
  let fixture: ComponentFixture<DetailsSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
