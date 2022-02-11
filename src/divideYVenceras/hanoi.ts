
import Algoritmo from "../algoritmo";
import Conjunto from "../dataStructures/conjunto";
import Grafo from "../dataStructures/grafo";
import Pila from "../dataStructures/pila";

type Entrada = number;
type Salida = number;
const a = 0;
const b = 0;
const c = 0;
const f0 = 0;
const f1 = 1;
const f2 = 2;
export default class Hanoi extends Algoritmo<Entrada, Salida> {
    pilas : Pila<number>[] = [Pila.pilaVacia(0), Pila.pilaVacia(0), Pila.pilaVacia(0), ];
    test() {
        this.ejecutar(3);
        this.ejecutar(6);
        
    }
    tamañoProblema : number = 0;
    ejecutar(entrada: Entrada) : Salida {
        this.pilas[0].vaciar();
        this.pilas[1].vaciar();
        this.pilas[2].vaciar();
        this.tamañoProblema = entrada;
        for (let i = 0; i < entrada; i++) {
            this.pilas[0].apilar(entrada - i);
        }
        this.debug();
        this.hanoi( 1, 3, entrada);
        return 0;
    }

    hanoi(origen: number, destino: number, n: number) {
        if(n == 1) {
            console.log("Mover poste de " + origen + " a " + destino);
            this.pilas[destino - 1].apilar(this.pilas[origen - 1].desapilar());
            this.debug();
        } else {
            this.hanoi(origen, 6 - destino - origen, n - 1);
            this.hanoi(origen, destino, 1);
            this.hanoi(6 - origen - destino, destino, n - 1);
        }
    }
    debug(n: number = this.tamañoProblema) {
        let str = "";
        for (let row = n - 1; row >= 0; row--) {
            for (let index = 0; index < 3; index++) {
                const element = this.pilas[index].listaElementos();
                if(row < element.length) {
                    str += " " + element[row] + " ";
                } else {
                    str += " | ";
                }
            }
            str += "\n";
                
        }
        str += "---------";
        console.log(str);
    }
}