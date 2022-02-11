
import Algoritmo from "../algoritmo";
import Conjunto from "../dataStructures/conjunto";
import Grafo from "../dataStructures/grafo";
import Lista from "../dataStructures/lista";
import Pila from "../dataStructures/pila";

type Entrada = {palabra: string, indice: number};
type Salida = Entrada;
export default class GenerarPalabras extends Algoritmo<Entrada, Salida> {
    
    letras = "abcdefghijklmnopqrstuvwxyz";
    vocales = "aeiou";

    listaNegra : Conjunto<string[]> = Conjunto.conjuntoVacio();
    test() {
        this.ejecutar({indice: 0, palabra: ""})
    }
    ejecutar(entrada: Entrada) : Salida {

        if(this.valido(entrada)) {
            console.log(entrada);
            return entrada;
        }
        let hijos = this.compleciones(entrada);
        while(!hijos.vacia()) {
            let hijo = hijos.primero();
            if(this.condicionesDePoda(hijo)) {
                this.ejecutar(hijo);
            }
            hijos.resto();
        }
        return entrada;
    }
    valido(e:Entrada) {
        return e.indice == 4;
    }

    condicionesDePoda(e: Entrada) {
        return this.condicion1(e) && this.condicion2(e) && this.condicion3(e) && this.condicion4(e);
    }

    condicion1(e:Entrada) {
        return this.vocal(e.palabra[0]);
    }

    condicion2(e:Entrada) {
        return e.indice < 2 || this.consonante(e.palabra[e.indice - 1]) || e.palabra[e.indice -1] != e.palabra[e.indice -2];
        
    }

    condicion3(e:Entrada) {
        let i = e.indice;
        return i < 3 || 
                this.vocal(e.palabra[i - 2]) !=  this.vocal(e.palabra[i - 1]) || 
                this.vocal(e.palabra[i - 3]) !=  this.vocal(e.palabra[i - 1]);
    }

    condicion4(e:Entrada) {
        let i = e.indice;
        let b = [e.palabra[i - 2], e.palabra[i - 1]];
        
        return !this.listaNegra.pertenece(b);
    }

    vocal(s: string) {
        return this.vocales.indexOf(s) !== -1;
    }
    consonante(s: string) {
        return !this.vocal(s);
    }

    compleciones(e:Entrada) {
        let lista = Lista.listaVacia<Entrada>();
        for (let index = 0; index < this.letras.length; index++) {
            const element = this.letras[index];
            let hijo = this.añadirLetra(e, element);
            lista.añadir(hijo);
        }
        return lista;

    }
    añadirLetra(e:Entrada, letra: string) {
        let nuevo = {...e};
        nuevo.palabra += letra;
        nuevo.indice ++;
        return nuevo;

    }
}