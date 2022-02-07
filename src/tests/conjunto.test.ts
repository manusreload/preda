import Conjunto from "../dataStructures/conjunto"

function crearConjunto(...elementos:number[]) {

    let c = Conjunto.conjuntoVacio(0);
    c.añadir(...elementos);
    return c;

}
test('Conjunto de numeros', () => {
    let c = Conjunto.conjuntoConElementos(0,1,2,3);

    let c2 = Conjunto.conjuntoVacio(0);
    let c3 = Conjunto.conjuntoConElementos(0,1,2);

    expect(c.cardinalidad()).toBe(4);
    expect(c.pertenece(1)).toBe(true);
    expect(c.pertenece(100)).toBe(false);
    expect(c.subconjunto(c3)).toBe(false);
    expect(c.superconjunto(c3)).toBe(true);
    expect(c.igualdad(c3)).toBe(false);

    c3.añadir(3);
    expect(c.subconjunto(c3)).toBe(true);
    expect(c.superconjunto(c3)).toBe(true);
    expect(c.igualdad(c3)).toBe(true);


    let c4 = Conjunto.conjuntoConElementos(0,1,2,3,4);
    expect(c.interseccion(c2).cardinalidad()).toBe(0);
    expect(c.union(c2).igualdad(c)).toBe(true);
    c2.añadir(0);
    expect(c.interseccion(c2).cardinalidad()).toBe(1);
    c2.añadir(4);
    expect(c.union(c2).igualdad(c4)).toBe(true);
    
    expect(c4.diferencia(c).igualdad(Conjunto.conjuntoConElementos(4))).toBe(true);
});