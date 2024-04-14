import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardPersonneComponent } from './list-card-personne.component';

describe('ListCardPersonneComponent', () => {
  let component: ListCardPersonneComponent;
  let fixture: ComponentFixture<ListCardPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCardPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
