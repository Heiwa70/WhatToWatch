import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVerticaleComponent } from './menu-verticale.component';

describe('MenuVerticaleComponent', () => {
  let component: MenuVerticaleComponent;
  let fixture: ComponentFixture<MenuVerticaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuVerticaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVerticaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
