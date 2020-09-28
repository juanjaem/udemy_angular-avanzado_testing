import { usuarioIngresado } from "./boleanos";


describe('Pruebas de Booleanos', () => {

    it('Debe devolver true', () => {
        const resp = usuarioIngresado();
        expect(resp).toBeTruthy();
    });

});
