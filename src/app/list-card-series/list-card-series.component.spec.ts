import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardSeriesComponent } from './list-card-series.component';

describe('ListCardSeriesComponent', () => {
  let component: ListCardSeriesComponent;
  let fixture: ComponentFixture<ListCardSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCardSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
