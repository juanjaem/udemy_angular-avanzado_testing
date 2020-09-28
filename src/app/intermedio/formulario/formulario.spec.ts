import { FormBuilder } from '@angular/forms';
import { FormularioRegister } from './formulario';


describe('Formularios', () => {
    let componente: FormularioRegister;

    beforeEach(() => {
        componente = new FormularioRegister( new FormBuilder() );
    });


    it('Debe de crear un formulario con dos campos: email y password', () => {
        expect(componente.form.contains('email')).toBeTruthy();
        expect(componente.form.contains('password')).toBeTruthy();
    });

    it('El email debe de ser obligatorio', () => {
        const control = componente.form.get('email');
        control.setValue('');

        expect(control.valid).toBeFalsy();
    });

    it('El email debe de ser valido', () => {
        const control = componente.form.get('email');
        control.setValue('juan@gmail.com');

        expect(control.valid).toBeTruthy();
    });

});
