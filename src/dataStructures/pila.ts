
/**
 * Pila: Es un tipo de lista LIFO  (Last in In Last in Out). La forma en recuperar los datos
 *  es el ultimo en entrar es el primero en salir.
 * 
 */
export default class Pila<T> {
    private lista  : T[] = [];
    private punteroPila = 0;


    static pilaVacia<T>(tipo:T) {
        return new Pila<T>();
    }

    apilar(elemento:T) {
        this.lista.push(elemento);
        this.punteroPila ++;
    }

    desapilar() {
        if(this.punteroPila > 0) {
            return this.lista[this.punteroPila--];
        }
    }

    vacia() {
        return this.punteroPila == 0;
    }

    llena() {
        if(this.punteroPila >= 1024) return true;
        return false;
    }

    altura() {
        return this.punteroPila;
    }
}