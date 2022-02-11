
import Algoritmo from "../algoritmo";
import Conjunto from "../dataStructures/conjunto";
import Grafo from "../dataStructures/grafo";
import Lista from "../dataStructures/lista";
import Pila from "../dataStructures/pila";

type Posicion = {i: number,j: number};
type Ensayo = {posicion: Posicion, tablero: boolean[][], movimientos: Posicion[], tamaño: number};
type Salida = Ensayo;
export default class CaballoAjedrez extends Algoritmo<Ensayo, Salida> {
    
    letras = "abcdefghijklmnopqrstuvwxyz";
    vocales = "aeiou";

    listaNegra : Conjunto<string[]> = Conjunto.conjuntoVacio();
    test() {
        let tamaño = 8;
        let tablero = [];
        for (let index = 0; index < tamaño; index++) {
            tablero[index] = [];
            for (let index2 = 0; index2 < tamaño; index2++) {
                tablero[index][index2] = true;
                
            }
        }
        tablero[0][0] = false;
        let ensayo : Ensayo = {posicion: {i: 0, j: 0}, tablero, tamaño};
        this.ejecutar(ensayo)
    }
    ejecutar(entrada: Ensayo) : Salida {
        
        if(this.valido(entrada)) {
            console.log(entrada);
            return entrada;
        }
        let hijos = this.compleciones(entrada);
        while(!hijos.vacia()) {
            let hijo = hijos.primero();
            this.ejecutar(hijo);
            hijos.resto();
        }
        return entrada;
    }
    valido(e:Ensayo) {
        for (let i = 0; i < e.tamaño; i++) {
            for (let j = 0; j < e.tamaño; j++) {
                const element = e.tablero[i][j];
                if(element) return false;
            }
        }
        return true;
    }


    compleciones(e:Ensayo) {
        let lista = Lista.listaVacia<Ensayo>();
        let ultPos = e.posicion;
        let N = e.
        return lista;

    }
    añadirLetra(e:Entrada, letra: string) {
        let nuevo = {...e};
        nuevo.palabra += letra;
        nuevo.indice ++;
        return nuevo;

    }
}