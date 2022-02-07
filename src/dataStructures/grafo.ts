
export type Vertice = number;
export default class Grafo<T> {
    private matrizAdyacencia : T[][] = [];
    private vertices : Vertice[] = [];
    private grado : Vertice[] = [];
    private tamaño = 0;

    public static grafoVacío<T>(tipo : T ) {
        return new Grafo<T>();
    }
    /**
     * 
     * @param vertices Lista de vertices y su peso asociado de la forma: 
     *          [v1_origen, v1_destino, peso1], [v2_origen, v2_destino, peso2],...
     * @returns 
     */
    public static grafoConElementos<T>(...vertices:any[][]) {
        let g = new Grafo<T>();
        for (let index = 0; index < vertices.length; index++) {
            const element = vertices[index];
            if(element.length >= 2) {
                if(!g.adyacentes(element[0], element[1])) {
                    g.añadirVertice(element[0]);
                    g.añadirVertice(element[1]);
                    g.añadirArista(element[0], element[1], element[2]);
                }
            }
        }
        return g;
    }

    convertirEnNoDirigido() {
        // por cada par-vertice (i, j), establecer i->j, j->i
        for (let i = 0; i < this.vertices.length; i++) {
            for (let j = 0; j < this.vertices.length; j++) {
                let vi = this.vertices[i];
                let vj = this.vertices[j];
                if(vi != vj) {
                    if(this.adyacentes(vi, vj)) {
                        this.añadirArista(vj, vi, this.peso(vi, vj));
                    }
                }
                
            }
            
        }
        return this;
    }

    sucesores(vertice:Vertice) {
        let resultado = [];
        for (let index = 0; index < this.vertices.length; index++) {
            let vertice2 = this.vertices[index];
            if(vertice != vertice2 && this.matrizAdyacencia[vertice][vertice2] !== undefined) {
                resultado.push(index);
            }
        }
        return resultado;
    }

    peso(vertice1: Vertice, vertice2: Vertice) {
        if(this.matrizAdyacencia[vertice1]) {
            return this.matrizAdyacencia[vertice1][vertice2];
        }
        throw new Error("El vértice " + vertice1 + " no pertenece al conjunto");
    }

    añadirArista(vertice1: Vertice, vertice2: Vertice, peso :T) {
        this.matrizAdyacencia[vertice1][vertice2] = peso;
        this.grado[vertice1]++;
        return this; 
    }
    añadirVertice(vertice1: Vertice) {
        if(!this.matrizAdyacencia[vertice1]) {
            this.matrizAdyacencia[vertice1] = [];
            this.vertices.push(vertice1);
        }
        if(!this.grado[vertice1]) {
            this.grado[vertice1] = 0;
        }
        return this;
    }

    borrarArista(vertice1: Vertice, vertice2: Vertice) {
        if(this.matrizAdyacencia[vertice1]) {
            this.matrizAdyacencia[vertice1][vertice2] = null;
            this.grado[vertice1]--;
            if(this.grado[vertice1] < 0) {
                this.grado[vertice1] = 0;
            }
        }
        return this; 
    }
    borrarVertice(vertice1: Vertice) {
        let i = this.vertices.indexOf(vertice1);
        if(i >= 0) {
            this.matrizAdyacencia[vertice1] = undefined;
            this.vertices.splice(i, 1);
        }
        return this;
    }
    adyacentes(vertice1: Vertice, vertice2: Vertice) {
        return this.matrizAdyacencia[vertice1] && this.matrizAdyacencia[vertice1][vertice2] !== undefined;
    }

    númeroVertices() {
        return this.vertices.length;
    }
    
    vertice(index: number) {
        return this.vertices[index];
    }

    gradoVertice(vertice: number) {
        return this.grado[vertice];
    }

    listaVertices() {
        return this.vertices;
    }
}