import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccesoParaUsuarios } from './landing-page';

describe('AccesoParaUsuarios', () => {
  let component: AccesoParaUsuarios;
  let fixture: ComponentFixture<AccesoParaUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesoParaUsuarios],
    }).compileComponents();

    fixture = TestBed.createComponent(AccesoParaUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
