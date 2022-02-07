import Algoritmo from "../algoritmo";
import Grafo from "../dataStructures/grafo";
import Lista from "../dataStructures/lista";
import Monticulo from "../dataStructures/monticulo";

export default class TablaDistancias extends Algoritmo<Grafo<number>, number[][]> {
    test() {
        
        let grafo = Grafo.grafoConElementos<number>(
            [1, 2, 7],
            [1, 3, 5],
            [1, 4, 3],
            [1, 5, 10],
            [2, 4, 10],
            [3, 5, 2]
        );
        grafo.convertirEnNoDirigido();
        let r = this.ejecutar(grafo);
        console.table(r);
        let grafo2 = Grafo.grafoConElementos<number>(
            [0, 1, 4],
            [0, 7, 8],
            [1, 2, 8],
            [1, 7, 11],
            [2, 3, 7],
            [2, 5, 4],
            [2, 8, 2],
            [3, 4, 9],
            [3, 5, 14],
            [4, 5, 10],
            [5, 6, 2],
            [6, 7, 1],
            [6, 8, 6],
            [7, 8, 7],
        );
        grafo2.convertirEnNoDirigido();
        let r2 = this.ejecutar(grafo2);
        console.table(r2);

    }
    ejecutar(entrada: Grafo<number>) : number[][] {
        let v = entrada.númeroVertices();
        let r = [];
        for (let index = 0; index < v; index++) {
            const element = entrada.vertice(index);
            r[element] = (this.dijkstra(entrada, element));
            
        }
        return r;
        
    }

    dijkstra(entrada: Grafo<number>, v: number) {
        
        let n = entrada.númeroVertices();
        let D : number[] = []; // [1..N]
        let C : number[] = []; // Candidatos
        for (let i = 0; i < n; i++) C.push(entrada.vertice(i));

        for (let i = 0; i < n; i++) {
            let iv = entrada.vertice(i);
            D[iv] = entrada.peso(v, iv)??Infinity;
            if(iv == v) {
                D[iv] = 0;
            }
            
        }
        while(C.length > 0) {
            v = this.minimo(C, D);
            C.splice(C.indexOf(v), 1);
            for (let index = 0; index < C.length; index++) {
                const w = C[index];
                D[w] = Math.min(D[w], D[v] + (entrada.peso(v, w)??Infinity));
            }

        }
        return D;
    }

    minimo (vertices: number[], distancia: number[]) {
        let min = 10000;
        let i = vertices[0];
        for (let index = 0; index < vertices.length; index++) {
            const element = vertices[index];
            if(distancia[element] < min) {
                i = element;
                min = distancia[element];
            }
        }
        return i;

    }
}