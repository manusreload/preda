import AlmacenamientoCinta from "./voraces/almacenamientoCinta";
import Carreteras from "./voraces/carreteras";
import MezclaCintas from "./voraces/mezclaCintas";
import Recubrimiento from "./voraces/recubrimiento";
import TablaDistancias from "./voraces/tablaDistancias";


export default class Main {

    static run() {

        let problema = new Carreteras();
        problema.test();
    }
}

Main.run()