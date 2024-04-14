import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPersonneComponent } from './card-personne.component';

describe('CardPersonneComponent', () => {
  let component: CardPersonneComponent;
  let fixture: ComponentFixture<CardPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
