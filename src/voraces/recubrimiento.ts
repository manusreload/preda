import Algoritmo from "../algoritmo";
import Grafo from "../dataStructures/grafo";

type Entrada = Grafo<number>;
type Salida = number[];
export default class Recubrimiento extends Algoritmo<Entrada, Salida> {
    test() {
        
        let grafo = Grafo.grafoConElementos<number>(
            [1,2, 1],
            [2,3, 1],
            [3,5, 1],
            [4, 1, 1],
            [4, 3, 1],
            [5,1, 1],
        );
        grafo.convertirEnNoDirigido();
        let r = this.ejecutar(grafo);
        console.log(r);
        let grafo2 = Grafo.grafoConElementos<number>(
            [1,2,1],
            [1,3,1],
            [2,3,1],
            [2,4,1],
            [3,5,1],
            [4,5,1],
            [4,6,1],
        ).convertirEnNoDirigido();
        console.log(this.ejecutar(grafo2));


    }
    ejecutar(entrada: Entrada) : Salida {
        let solucion : number[] = [];
        while(!this.solucion(entrada, solucion) && entrada.númeroVertices() > 0) {
            let x = this.elementoQueMaximiza(entrada);
            if(x === null) break;
            let sucesores = entrada.sucesores(x);
            solucion.push(x);
            for (let i = 0; i < sucesores.length; i++) {
                const element = sucesores[i];
                entrada.borrarArista(element, x);
                
            }
            entrada.borrarVertice(x);
        }

        return solucion;
    }

    solucion(entrada: Entrada, solucion: number[]) {
        if(solucion.length == 0) return false;
        for (let i = 0; i < entrada.númeroVertices(); i++) {
            const element = entrada.vertice(i);
            if(solucion.indexOf(element)) return false;            
        }
        return true;
    }

    elementoQueMaximiza(entrada: Entrada) {
        let max = 0;
        let v = null;
        
        for (let i = 0; i < entrada.númeroVertices(); i++) {
            const element = entrada.vertice(i);
            if(entrada.gradoVertice(element) > max) {
                v = element; max = entrada.gradoVertice(element);
            }
        }
        return v;
    }
}