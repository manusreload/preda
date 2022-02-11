import Algoritmo from "../algoritmo";
import Conjunto from "../dataStructures/conjunto";
import Grafo from "../dataStructures/grafo";

type Entrada = Grafo<number>;
type Salida = Conjunto<number[]>;
export default class Carreteras extends Algoritmo<Entrada, Salida> {
    test() {
        
        let grafo1 = Grafo.grafoConElementos<number>(
            [1, 3, 5],
            [1, 4, 2],
            [2, 3, 3],
            [2, 8, 7],
            [3, 5, 2],
            [3, 6, 12],
            [4, 6, 1],
            [5, 7, 22],
            [5, 8, 7],
            [6, 7, 12],
        ).convertirEnNoDirigido();
        console.log(this.ejecutar(grafo1));


    }
    ejecutar(entrada: Entrada) : Salida { // Prim
        let N = Conjunto.conjuntoConElementos(...entrada.listaVertices());
        let solucion = Conjunto.conjuntoVacio([0, 0]);
        let B = Conjunto.conjuntoConElementos(entrada.vertice(0));
        while(!B.igualdad(N)) {
            // Buscar e = {u, v} de long. mínima tal que u € B y v € N \ B
            let minimo = this.minimo(entrada, N, B);
            solucion.añadir(minimo);
            B.añadir(minimo[1]);
        }
        return solucion;
    }

    minimo(grafo: Entrada, N: Conjunto<number>, B: Conjunto<number>) {
        let min = Infinity;
        let resU, resV ;
        let diff = N.diferencia(B);
        for (let u = 0; u < B.elementos().length; u++) {
            const elementU = B.elemento(u);
            for (let v = 0; v < diff.elementos().length; v++) {
                const elementV = diff.elemento(v);
                if(grafo.peso(elementU, elementV) < min) {
                    min = grafo.peso(elementU, elementV);
                    resU = elementU; resV = elementV;
                }
            }
            
        }
        return [resU, resV];
    }
}