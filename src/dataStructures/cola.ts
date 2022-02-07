
/**
 * Es un tipo de lista FIFO: primero en entrar, primero en salir
 */
export default class Cola<T> {
    private lista  : T[] = [];
    private longitudCola = 0;


    static colaVacia<T>(tipo:T) {
        return new Cola<T>();
    }

    encolar(elemento:T) {
        this.lista.push(elemento);
        this.longitudCola ++;
    }

    desencolar() {
        if(this.longitudCola > 0) {
            this.longitudCola--;
            return this.lista.shift();
        }
    }

    vacia() {
        return this.longitudCola == 0;
    }

    llena() {
        if(this.longitudCola >= 1024) return true;
        return false;
    }

    longitud() {
        return this.longitudCola;
    }
}