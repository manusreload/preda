
import Algoritmo from "../algoritmo";
import Conjunto from "../dataStructures/conjunto";
import Grafo from "../dataStructures/grafo";

type Entrada = number;
type Salida = number;
const a = 0;
const b = 0;
const c = 0;
const f0 = 0;
const f1 = 1;
const f2 = 2;
export default class Carreteras extends Algoritmo<Entrada, Salida> {
    test() {
        
    }
    ejecutar(entrada: Entrada) : Salida {

        let F = [
            [0, 1, 0],
            [0, 0, 1],
            [a, b, c],
        ];
    
        if(entrada == 0) return f0
        if(entrada == 1) return f1
        if(entrada == 2) return f2
        let S = this.exp_mat(F, entrada - 2);
        return 0;
    }

    exp_mat(M:number[][], n: number) : number[][] {
        if(n <= 1) {
            return this.solucionSimple(M, n);
        }
        let p = Math.floor(n / 2);
        let r = n % 2;
        let T = this.exp_mat(M, p);
        return this.combinacion(T, r, M);
    }

    solucionSimple(M:number[][], n: number) {
        if(n == 1) return M;
        return [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ]

    }

    combinacion(T: number[][], r: number, M:number[][]) {
        // TT * M ^ r
        return T;

    }

    
}