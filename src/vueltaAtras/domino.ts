
import Algoritmo from "../algoritmo";
import Conjunto from "../dataStructures/conjunto";
import Grafo from "../dataStructures/grafo";
import Lista from "../dataStructures/lista";
import Pila from "../dataStructures/pila";
type Ficha = {i: number, j: number};
type Entrada = {caja: boolean[][], cadena: Ficha[], ultima: number};
type Salida = Entrada;
export default class Domino extends Algoritmo<Entrada, Salida> {
    
    ultimaFichaColocada : number[] = [0, 0];
    test() {
        let juego : Entrada = {caja: [], cadena: [], ultima: 0}; 
        for (let index = 0; index < 28; index++) {
            for (let i = 0; i <= 6; i++) {
                juego.caja[i] = [];
                for (let j = 0; j <= 6; j++) {
                    juego.caja[i][j] = true;
                }
            }
            
        }
        this.ejecutar(juego);
    }
    ejecutar(entrada: Entrada) : Salida {

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
    valido(e:Entrada) {
        for (let i = 0; i < e.caja.length; i++) {
            const element = e.caja[i];
            for (let j = 0; j < element.length; j++) {
                const element2 = element[j];
                if(element2) {
                    return false;
                }
            }
        }
        return true;
    }
    compleciones(e:Entrada) {
        let lista = Lista.listaVacia<Entrada>();
        
        let ultimaFicha = e.cadena[e.ultima - 1];
        let j = ultimaFicha ? ultimaFicha.j : 0;
        for (let i = 0; i <= 6; i++) {
            if(e.caja[j][i]) {
                let juegoNuevo : Entrada = {cadena: [...e.cadena], caja: [...e.caja.map(a => [...a])], ultima: e.ultima};
                juegoNuevo.caja[i][j] = false;
                juegoNuevo.caja[j][i] = false;
                juegoNuevo.cadena[juegoNuevo.ultima] = {i, j};
                juegoNuevo.ultima ++;
                lista.añadir(juegoNuevo);
            }
            
        }
        

        return lista;

    }

}