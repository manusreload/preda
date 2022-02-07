import Lista from "../dataStructures/lista"

test('Listas', () => {

    let lista = Lista.listaConElementos(0,1,2,3);
    expect(lista.primero()).toBe(0);
    
    let lista2 = Lista.listaConElementos(1,2,3);
    expect(lista.vacia()).toBe(false);
    expect(lista.resto()).toStrictEqual(lista2);
    expect(lista.miembro(0)).toBe(false);
    expect(lista.miembro(1)).toBe(true);
    expect(lista.miembro(3)).toBe(true);
    expect(lista.elemento(0)).toBe(1);
    expect(lista.elemento(1)).toBe(2);
    expect(lista.primero()).toBe(1);
    lista.resto();
    lista.resto();
    lista.resto();

    expect(lista.vacia()).toBe(true);
});