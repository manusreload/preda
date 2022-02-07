
import Monticulo from "../dataStructures/monticulo";

test('Grafos', () => {
    // let g = Monticulo.monticuloVacio([38, 40, 25, 18, 30, 21, 14, 7, 10, 5])
    let g = Monticulo.monticuloVacio([15, 10, 8, 20, 30, 3, 40, 4])
    g.visualizar();
    expect(g.mínimo()).toBe(3)
    let g2 = Monticulo.monticuloVacio([5, 10, 7, 14, 21, 30, 18, 25, 40, 38, 41, 50, 80, 3])
    g2.visualizar();
    g2.añadir(1);
    expect(g2.mínimo()).toBe(1)
    g2.visualizar();

    let t : {p:number, id: number}[] = [
        {p: 22, id: 2},
        {p: 10, id: 1},
        {p: 2, id: 3},
        {p: 11, id: 4},
        {p: 32, id: 5},
        {p: 70, id: 6},
    ];
    let monticulo1 = Monticulo.monticuloVacio(t, (a, b) => a.p < b.p);

    expect(monticulo1.mínimo()).toStrictEqual({p: 2, id: 3});
    monticulo1.eliminarMin();
    monticulo1.eliminarMin();
    expect(monticulo1.mínimo()).toStrictEqual({p: 11, id: 4});
});