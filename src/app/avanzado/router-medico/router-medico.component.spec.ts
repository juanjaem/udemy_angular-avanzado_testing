import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';

import { RouterMedicoComponent } from './router-medico.component';


// No queremos implementar el Router xk solo vamos a utilizar un apropiedad. Para evitarlo, creamos un fake
class FakeRouter {
  navigate(params) {} // No hace nada. Solo queremos saber que lo ha llamado y punto
}

class FakeActivatedRoute {
  params: Observable<any> = of({id: 'nuevo'}); // Simulamos que devuelve un observable con un id en la respuesta.
}


describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterMedicoComponent ],
      providers: [
        // Router, // En vez de usar y testear estos servicios, usaremos unos falsos
        // ActivatedRoute,
        { provide: Router, useClass: FakeRouter}, // Sustituimos estos servicios por unos falsos
        { provide: ActivatedRoute, useClass: FakeActivatedRoute},
      ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Debe de redireccionar a Médico cuando se guarde', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.guardarMedico();
    expect(spy).toHaveBeenCalledWith(['medico', '123']);
  });


  it('Debe de colocar el id = nuevo', () => {
    component = fixture. componentInstance;
    const activatedRoute: FakeActivatedRoute = TestBed.inject(ActivatedRoute);

    expect(component.id).toBe('nuevo');
  });


});
