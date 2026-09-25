import { TestBed } from '@angular/core/testing';
import { EstadoLogueo } from './estado-logueo';

describe('EstadoLogueo', () => {
  let service: EstadoLogueo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoLogueo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
