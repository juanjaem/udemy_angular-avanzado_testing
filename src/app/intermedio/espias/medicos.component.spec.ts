import { of, throwError } from 'rxjs';
import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';


describe('MedicosComponent', () => {

    let componente: MedicosComponent;
    const servicio = new MedicosService(null); // No vamos a usar el Http, le ponemos entonces null

    beforeEach( () => {
        componente = new MedicosComponent(servicio);
    });


    it('Init: Debe de cargar los médicos', () => {
        const medicos = ['medico1', 'medico2', 'medico3'];

        // Esta función sustituirá la funcionalidad de getMedicos en el servicio por la que nosotros queramos
        spyOn(servicio, 'getMedicos').and.callFake(() => {
            return of(medicos); // Devolver un observable que devuelve un array con médicos
        });

        // Despues de ejecutarse el ngOnInit debería haberse inicializado los médicos
        componente.ngOnInit();
        expect(componente.medicos.length).toBeGreaterThan(0);
    });


    it('Debe de llamar al servidor para agregar un médico', () => {
        const espia = spyOn(servicio, 'agregarMedico').and.callFake(medico => {
            return of();
        });

        componente.agregarMedico();

        expect(espia).toHaveBeenCalled(); // Comprobar si se ha llamado al método fake del servicio
    });


    it('Debe de agregar un nuevo médico al arreglo de médicos', () => {
        const medico = { id: 1, nombre: 'juan' };

        spyOn(servicio, 'agregarMedico').and.returnValue( of(medico) ); // ReturnValue directamente decimos lo que devuelve agregarMedico

        componente.agregarMedico();

        expect( componente.medicos.indexOf(medico) ).toBeGreaterThanOrEqual(0);
    });


    it('Si falla la adicion, la propiedad mensajeError, debe ser igual al error del servicio', () => {
        const miError = 'No se pudo agregar el médico';

        spyOn(servicio, 'agregarMedico').and.returnValue( throwError(miError) );

        componente.agregarMedico();

        expect(componente.mensajeError).toBe(miError);
    });


    it('Debe de llamar al servidor para borrar un médico', () => {
        spyOn(window, 'confirm').and.returnValue(true); // Para autoconfirmar el alert que saldría en la llamada a borrarMedico
        const espia = spyOn(servicio, 'borrarMedico').and.returnValue( of() );

        componente.borrarMedico('1');

        expect(espia).toHaveBeenCalledWith('1');
    });


    it('NO debe de llamar al servidor para borrar un médico', () => {
        spyOn(window, 'confirm').and.returnValue(false); // Para autoconfirmar el alert que saldría en la llamada a borrarMedico
        const espia = spyOn(servicio, 'borrarMedico').and.returnValue( of() );

        componente.borrarMedico('1');

        expect(espia).not.toHaveBeenCalledWith('1');
    });
    



});
