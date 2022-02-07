
/**
 * Coleccion de elementos con orden
 */
export default class Lista <T> {
    private lista : T[] = [];

    static listaVacia<T>(tipo:T) {
        return new Lista<T>();
    }
    static listaConElementos<T>(...tipo:T[]) {
        let l = new Lista<T>();
        for (let index = 0; index < tipo.length; index++) {
            const element = tipo[index];
            l.añadir(element);
            
        }
        return l;
    }

    añadir(elemento:T) {
        this.lista.push(elemento);
    }


    resto() {
        this.lista.shift();
        return this;
    }

    vacia() {
        return this.lista.length === 0;
    }

    miembro(elemento:T) {
        for (let index = 0; index < this.lista.length; index++) {
            const element = this.lista[index];
            if(element === elemento) return true;
        }
        return false;
    }

    elemento(p:number) {
        return this.lista[p];
    }

    primero() {
        if(this.lista.length > 0) {
            return this.lista[0];
        }
    }

}