import Algoritmo from "../algoritmo";

type Ensayo = {matrices: number[], pos: number[][]}
export default class ProductoMatrices extends Algoritmo<Ensayo, any> {
    test(): void {
        this.ejecutar({matrices: [60, 2, 2, 30, 30, 5, 5, 20], pos: []});
        this.ejecutar({matrices: [30, 35, 35, 15, 15, 5, 5, 10, 10, 20, 20, 25], pos: []});
    }
    ejecutar(entrada: Ensayo) {
        let N = entrada.matrices.length / 2;
        
        let tabla : number[][] = [];
        for (let i = 1; i <= N; i++) {
            tabla[i] = [];
            tabla[i][i] = 0;  
            entrada.pos[i] = [];
        }
        for (let diag = 1; diag <= N-1; diag++) {
            for (let i = 1; i <= N- diag; i++) {
                let r = this.MinMultiple(tabla, entrada.matrices, i, i +diag);
                tabla[i][i+diag] = r.min;
                entrada.pos[i][i+diag] = r.p;
            }
        }
        
        console.table(tabla);
        console.table(entrada.pos);
    }

    MinMultiple(tabla: number[][], matrices: number[], i : number, j: number) {
        let min = Infinity;
        let p = i, tmp;
        for (let k = i; k <= j -1 ; k++) {
            tmp = tabla[i][k] + tabla[k + 1][j] + matrices[i - 1] * matrices[k] * matrices[j];
            if(tmp < min) {
                min = tmp;
                p = k;
            }
        }

        return {min, p};
    }

}