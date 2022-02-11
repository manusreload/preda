import Algoritmo from "../algoritmo";
import Conjunto from "../dataStructures/conjunto";
import Lista from "../dataStructures/lista";
import Monticulo from "../dataStructures/monticulo";
type Alumno = {
    id: string,
    valoracion: number,
    restricciones: any[],
    transtornos: string[],

}
type Ensayo = {
    alumnos: Alumno[],
    aula: number,
};
type Resultado = {
    alumnos: Alumno[],
    aula: number,
}
type MejorResultado = {
    alumnos: Alumno[],
    aula: number,
    n: number,
}
export default class AlumnosEspeciales extends Algoritmo<Ensayo, any> {
    test(): void {
        let alumnos : Alumno[] = [];
        alumnos.push({id: "1", restricciones: [], transtornos: [], valoracion: 2});
        alumnos.push({id: "2", restricciones: [], transtornos: [], valoracion: 5});
        alumnos.push({id: "3", restricciones: [], transtornos: [], valoracion: 6});
        alumnos.push({id: "4", restricciones: [], transtornos: [], valoracion: 6});
        alumnos.push({id: "5", restricciones: [], transtornos: [], valoracion: 5});
        alumnos.push({id: "6", restricciones: [], transtornos: [], valoracion: 4});
        alumnos.push({id: "7", restricciones: [], transtornos: [], valoracion: 8});
        alumnos.push({id: "8", restricciones: [], transtornos: [], valoracion: 9});
        alumnos.push({id: "9", restricciones: [], transtornos: [], valoracion: 1});
        alumnos.push({id: "10", restricciones: [], transtornos: [], valoracion: 7});
        alumnos.push({id: "11", restricciones: [], transtornos: [], valoracion: 8});
        alumnos.push({id: "12", restricciones: [], transtornos: [], valoracion: 8});
        alumnos.push({id: "13", restricciones: [], transtornos: [], valoracion: 9});
        alumnos.push({id: "14", restricciones: [], transtornos: [], valoracion: 9});
        alumnos.push({id: "15", restricciones: [], transtornos: [], valoracion: 2});
        alumnos.push({id: "16", restricciones: [], transtornos: [], valoracion: 1});

        this.ejecutar({alumnos, aula: 4});

    }
    ejecutar(entrada: Ensayo) {
        if(entrada.alumnos.length > entrada.aula * entrada.aula) {
            throw new Error("Tamaño de aula demasiado pequeño");
        }
        let aulasResultado : MejorResultado = {alumnos: [], aula: 0, n: 0}
        this.algoritmoRec({alumnos: [], aula: entrada.aula}, entrada, aulasResultado);

        
        
    }

    mostrarDisposicion(aulasResultado : MejorResultado) {
        let tabla : Alumno[][] = [];
        for (let index = 0; index < aulasResultado.alumnos.length; index++) {
            let i = Math.floor(index / aulasResultado.aula);
            let j = (index % aulasResultado.aula);
            if(!tabla[i]) {
                tabla[i] = [];
            }
            tabla[i][j] = aulasResultado.alumnos[index];
        }
        console.table(tabla.map(a => a ? a.map(a => a ? a.id : "") : ""));
    }
    multiplicarMatrizInfluencia2(r : Resultado, N: number) {
        let total = 0, i, j, k , l, n;
        let element;
        for (let index = 0; index < r.alumnos.length; index++) {
            element = r.alumnos[index];
            i = Math.floor(index / N);
            j = index % N;
            for (let index2 = 0; index2 < r.alumnos.length; index2++) {
                if(index2 == index) {
                    total += element.valoracion;
                } else {
                    k = Math.floor(index2 / N);
                    l = index2 % N;
                    let d = Math.abs(k -i) + Math.abs(l - j);
                    total+= r.alumnos[index2].valoracion * (1 / (d + 1));
                }
            }
        }
        return total;
    }
    multiplicarMatrizInfluencia(m: Alumno[][], N: number) {
        let total = 0;
        let n = 0;
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                n = 0;
                if(m[i][j]) {
                    for (let k = 0; k < N; k++) {
                        for (let l = 0; l < N; l++) {
                            if(k == i && j == l) {
                                n+= m[i][j].valoracion;
                            } else if(m[k][l]) {
                                let d = Math.abs(k -i) + Math.abs(l - j);
                                n+= m[k][l].valoracion * (1 / (d + 1));
                            }
                        }
                    }
                }
                //tabla[i][j] = n;
                total += n;
            }
        }

        return total;

    }
    algoritmoRec(entrada:Resultado, ensayo : Ensayo, aulasResultado: MejorResultado) {

        if(this.valido(entrada, ensayo)) {
            // let n = this.multiplicarMatrizInfluencia2(entrada, ensayo.aula);
            // if(n > aulasResultado.n) {
            //     console.log(n);
            //     aulasResultado.n = n;
            //     aulasResultado.alumnos = entrada.alumnos;
            //     aulasResultado.aula = entrada.aula;
            //     this.mostrarDisposicion(aulasResultado);
            // }
            return aulasResultado;
        }
        let hijos = this.compleciones(ensayo, entrada);
        while(!hijos.vacia()) {
            let hijo = hijos.primero();
            if(this.condicionesDePoda(hijo)) {
                this.algoritmoRec(hijo, ensayo, aulasResultado);
            }
            hijos.resto();
        }
        return entrada;
    }

    valido(e: Resultado, ensayo : Ensayo) {
        return e.alumnos.length == (ensayo.alumnos.length);
    }

    condicionesDePoda(r: Resultado) {
        
        return true;
    }

    compleciones(e: Ensayo, r: Resultado) {
        let aulas = Lista.listaVacia<Resultado>();

        for (let index = 0; index < e.alumnos.length; index++) {
            const element = e.alumnos[index];
            let r2 : Resultado = {...r, alumnos: [...r.alumnos] };
            if(r2.alumnos.indexOf(element) === -1) {
                r2.alumnos.push(element);
                aulas.añadir(r2);
            }
        }
        return aulas;
    }

}