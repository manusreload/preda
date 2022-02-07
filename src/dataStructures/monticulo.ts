type T = number;
const TAMAÑO_MAXIMO = 1024;

export default class Monticulo<T> {
    private vector : T[] = [];
    private ultimo = 0;

    private comparator :  (a: T, b: T) => boolean = undefined;

    static monticuloVacio<T>(vector: T[], comparator? : (a: T, b: T) => boolean) {
        let m = new Monticulo<T>();
        m.comparator = comparator;
        m.monticulizar(vector);
        return m;
    }

    /**
     * 
     * @param a 
     * @param b 
     * @returns True si a < b
     */
    comparar(a: T, b: T) {
        if(this.comparator) {
            return this.comparator(a, b);
        }
        return a < b;
    }
    div(a: number, b: number) {
        return Math.floor(a / b);
    }
    monticulizar(verctor: T[]) {
        for (let index = 0; index < verctor.length; index++) {
            this.añadir(verctor[index]);
        }

        
    }

    añadir(e: T) {
        if(this.ultimo >= TAMAÑO_MAXIMO) {
            throw new Error("Tamaño maximo");
        }
        this.ultimo++;
        this.vector[this.ultimo] = e;
        this.flotar(this.ultimo);
        return this;
    }

    flotar(i: number) {
        while(i != 1 && this.comparar(this.vector[i], this.vector[this.div(i, 2)])) {
            let tmp = this.vector[i];
            this.vector[i] = this.vector[this.div(i, 2)];
            this.vector[this.div(i, 2)] = tmp;
            i = this.div(i, 2);
        }
        return this;
    }

    /**
     * i < k
     * @param j 1..N
     * @param k 1..N
     * @returns 
     */
    hundir(j: number, k: number) {
        
        let fin = false;
        let i = j;
        let m = 0;
        while(2*i  <= k && !fin) { // { la posición i no es una hoja }
            // minimo de los hijos
            if(2*i + 1 <= k && this.comparar(this.vector[2*i+1], this.vector[2*i])) {
                m = 2 * i + 1;
            } else {
                m = 2 * i;
            }
            // { si es necesario, se intercambia con el mínimo de los hijos }
            if(this.comparar(this.vector[m] , this.vector[i])) {
                let tmp = this.vector[m];
                this.vector[m] = this.vector[i];
                this.vector[i] = tmp;
                i=m;
            } else {
                fin = true;
            }
        }
        return this;
    }

    eliminarMin() {
        if(this.ultimo !== 0) {
            this.vector[1] = this.vector[this.ultimo];
            // this.vector.splice(this.ultimo - 1, 1);
            this.ultimo = this.ultimo-1;
            this.hundir(1, this.ultimo);
        }
        return this;
    }

    mínimo() {
        if(this.ultimo ===0) {
            throw new Error("Montículo vacío");
        } else {
            return this.vector[1];
        }
    }

    vacío() {
        return this.ultimo === 0;
    }

    debug() {
        console.log(this.vector);
        console.log(this.ultimo);
    }
    printf(n:any) {
        if(n > 9) return n;
        return "0" + n;
    }
    visualizar() {
        let niveles = Math.floor(Math.log(2 * this.ultimo) / Math.log(2));
        let res = "";
        let c = 1;
        for (let i = 1; i <= niveles; i++) {
            res += ("  ".repeat((niveles-i + 1)));
            for (let j = 0; j < Math.pow(2, i - 1) && c <= this.ultimo; j++, c++) {
                res += this.printf(this.vector[c]) + (" ".repeat((niveles-i + 1) * 2));
            }
            res += "\n";
        }
        console.log(res);
    }
}