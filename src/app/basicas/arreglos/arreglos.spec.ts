import { obtenerRobots } from './arreglos';

xdescribe('Pruebas de arreglos', () => {

    it('Debe de retornar almenos 3 robots', () => {
        const res = obtenerRobots();
        expect(res.length).toBeGreaterThanOrEqual(3);
    });

    it('Debe de existir MegaMan y Ultron', () => {
        const res = obtenerRobots();
        expect(res).toContain('MegaMan');
        expect(res).toContain('Ultron');
    });

});

