import Algoritmo from "../algoritmo";
import Lista from "../dataStructures/lista";
import Monticulo from "../dataStructures/monticulo";

type Cinta = {longitud: number, id: string};
export default class MezclaCintas extends Algoritmo<Cinta[], any> {
    test() {
        let cintas : Cinta[] = [
            {longitud: 30, id: "A"},
            {longitud: 20, id: "B"},
            {longitud: 10, id: "C"},
        ]
        let list = this.ejecutar(cintas);
        console.log(list);

    }
    ejecutar(entrada: Cinta[]) {
        let solucion = Lista.listaVacia({longitud: 0, id: ""} as Cinta);
        for (let i = 0; i < entrada.length; i++) {
            solucion.añadir({longitud: 0, id: ""});
        }
        let i = 0; 
        let j = 0;
        while(i < entrada.length) {
            let x = this.seleccionar(entrada, j);
            solucion.elemento(j).longitud = x;
            x = 0;
            i++;

        }

        return solucion;
        
    }
    private seleccionar(s:Cinta[], j: number) {
        let min = 1;
        for (j = 0; j < s.length; j++) {
            if(s[j].longitud < s[min].longitud) {
                min = j;
            }
            
        }
        return s[min].longitud;
    }

    private completable(s:Cinta[], p: Cinta) {
        return true;
    }
}