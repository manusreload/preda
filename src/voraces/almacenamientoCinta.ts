import Algoritmo from "../algoritmo";
import Monticulo from "../dataStructures/monticulo";

type Programa = {longitud: number, identificador: number};
export default class AlmacenamientoCinta extends Algoritmo<Programa[], any> {
    test() {
        let programas : Programa[] = [
            {longitud: 10, identificador: 1},
            {longitud: 25, identificador: 2},
            {longitud: 90, identificador: 3},
            {longitud: 10, identificador: 4},
            {longitud: 80, identificador: 5},
            {longitud: 5, identificador: 6},
        ]
        let list = this.ejecutar(programas);
        console.log(list);

    }
    ejecutar(entrada: Programa[]) {
        let monticulo = Monticulo.monticuloVacio(entrada, (a, b) => a.longitud < b.longitud);
        let solucion : Programa[] = [];
        while(!this.solucion(solucion) && !(monticulo.vacío())) {
            let p = ( monticulo.mínimo() );
            monticulo.eliminarMin();
            if(this.completable(solucion, p)) {
                solucion.push(p);
            }
        }
        return solucion;
        
    }
    private solucion(s:Programa[]) {
        return false;
    }

    private elementoMaximizaObjetivo(p:Programa[]) {
        return p[0];
    }
    private completable(s:Programa[], p: Programa) {
        return true;
    }
}