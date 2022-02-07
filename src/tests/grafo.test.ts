
import Grafo from "../dataStructures/grafo";

test('Grafos', () => {
    let g = Grafo.grafoConElementos([0, 1, 10], [1, 2, 22], [2, 2, 3], [0, 2, 1]);

    expect(g.sucesores(0)).toStrictEqual([1, 2]);
    expect(g.sucesores(1)).toStrictEqual([2]);
    expect(g.sucesores(2)).toStrictEqual([]);


});