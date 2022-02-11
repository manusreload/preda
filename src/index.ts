import MezclaCintas from "./voraces/mezclaCintas";
import AlmacenamientoCinta from "./voraces/almacenamientoCinta";
import TablaDistancias from "./voraces/tablaDistancias";
import Recubrimiento from "./voraces/recubrimiento";
import Carreteras from "./voraces/carreteras";
import Fibonacci from "./divideYVenceras/fibonacci";
import Alumnos from "./divideYVenceras/alumnos";// ...
// Exponencial
import Hanoi from "./divideYVenceras/hanoi";
// Elemento igual indice
import GenerarPalabras from "./vueltaAtras/generarPalabras";
import Domino from "./vueltaAtras/domino"; // ....
import Mochila from "./programacionDinamica/mochila";
import Cambio from "./programacionDinamica/cambio";
import ProductoMatrices from "./programacionDinamica/productoMatrices";
import AlumnosEspeciales from "./vueltaAtras/alumnosEspeciales";
// Caballo ajedrez
// Cuadrado Magico...
// PasoNumeros
// RepartoTareas...



export default class Main {

    static run() {

        let problema = new AlumnosEspeciales();
        problema.test();
    }
}

Main.run()