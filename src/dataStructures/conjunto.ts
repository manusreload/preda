import Comparable from './comprable';

/**
 * Coleccion de elementos sin orden dado.
 */
export default class Conjunto<T> {

    private lista: T[] = []


    static conjuntoVacio<T>(tipo?:T ) {
        return new Conjunto<T>();
    }
    
    static conjuntoConElementos<T>(...elementos:T[] ) {
        return (new Conjunto<T>()).añadir(...elementos);
    }
    

    private comparar(e1: T, e2:T) {
        if((e1 as unknown as Comparable<T>).comparar) {
            return (e1 as unknown as Comparable<T>).comparar(e1, e2);
        }
        return e1 === e2;
    }

    elementos() {
        return this.lista;
    }

    elemento(index: number) {
        return this.lista[index];
    }

    /**
     * Coste computacional: n
     * @param el Elemento a buscar
     * @returns 
     */
    posicion(el:T) {
        return this.lista.findIndex((el2) => this.comparar(el, el2));
    }

    /**
     * Coste computacional: cte
     * @param el Elemento a buscar
     * @returns 
     */
    añadir(...elemento:T[]) {
        elemento.forEach(v => this.lista.push(v));
        return this;
    }

    /**
     * Coste computacional: n
     * @param el Elemento a buscar
     * @returns 
     */
    quitar(elemento:T) {
        let index = this.posicion(elemento);
        if(index >= 0) {
            this.lista.splice(index, 1);
        }
    }

    /**
     * Coste computacional: cte
     * @param el Elemento a buscar
     * @returns 
     */
    cardinalidad() {
        return this.lista.length;
    }

    /**
     * Coste computacional: n
     * @param el Elemento a buscar
     * @returns 
     */
    pertenece(elemento:T) {
        let index = this.posicion(elemento);
        return index >= 0;
    }

    /**
     * Coste computacional: n*n
     * @param el Elemento a buscar
     * @returns 
     */
    igualdad(c:Conjunto<T> ) {
        if(c.cardinalidad() !== this.cardinalidad()) return false;
        for (let index = 0; index < this.lista.length; index++) {
            const element = this.lista[index];
            if(!c.pertenece(element)) return false;
        }
        return true;
    }

    /**
     * Coste computacional: n*n
     * @param el Elemento a buscar
     * @returns 
     */
    subconjunto(c: Conjunto<T>) {
        if(this.cardinalidad() > c.cardinalidad()) return false;

        for (let index = 0; index < this.lista.length; index++) {
            const element = this.lista[index];
            if(!c.pertenece(element)) {
                return false;
            }
        }
        return true;

    }

    superconjunto(c: Conjunto<T>) {
        return c.subconjunto(this);
    }

    interseccion(c: Conjunto<T>) {
        let resultado = Conjunto.conjuntoVacio<T>();
        for (let index = 0; index < this.lista.length; index++) {
            const element = this.lista[index];
            if(c.pertenece(element)) {
                resultado.añadir(element);
            }
        }
        return resultado;
    }

    union(c: Conjunto<T>) {
        let resultado = Conjunto.conjuntoVacio<T>();

        for (let index = 0; index < this.lista.length; index++) {
            const element = this.lista[index];
            resultado.añadir(element);
        }
        for (let index = 0; index < c.elementos().length; index++) {
            const element = c.elementos()[index];
            if(!resultado.pertenece(element)) {
                resultado.añadir(element);
            }
        }
        return resultado;
    }
    /**
     * Operation A \ C, siendo A este objecto.
     * @param c 
     * @returns 
     */
    diferencia(c: Conjunto<T>) {
        let resultado = Conjunto.conjuntoVacio<T>();

        for (let index = 0; index < this.lista.length; index++) {
            const element = this.lista[index];
            if(!c.pertenece(element)) {
                resultado.añadir(element);
            }
        }
        return resultado;
    }



}