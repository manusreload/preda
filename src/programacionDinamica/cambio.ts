import Algoritmo from "../algoritmo";

type Ensayo = { monedas: number[], cambio: number }
export default class Cambio extends Algoritmo<Ensayo, any> {
    test(): void {
        this.ejecutar({ monedas: [1, 6, 10], cambio: 6 });
    }
    ejecutar(entrada: Ensayo) {
        let tabla: number[][] = [];
        for (let i = 0; i < entrada.monedas.length; i++) {
            tabla[i] = [];
            tabla[i][0] = 0;
            for (let j = 0; j <= entrada.cambio; j++) {
                tabla[i][j] = 0;
            }
        }

        for (let j = 1; j <= entrada.cambio; j++) {
            for (let i = 0; i < entrada.monedas.length; i++) {
                const moneda = entrada.monedas[i];
                if (i == 0 && moneda > j) {
                    tabla[i][j] = Infinity;
                } else {
                    if (i == 0) {
                        tabla[i][j] = 1 + tabla[0][j - moneda];
                    } else {
                        if (j < moneda) {
                            tabla[i][j] = tabla[i - 1][j];
                        } else {
                            tabla[i][j] = Math.min(tabla[i - 1][j], tabla[i][j - moneda] + 1)
                        }
                    }
                }
            }
        }
        console.table(tabla);
        
        let resultado = this.seleccionarMonedas(entrada.cambio, entrada.monedas, tabla);

        console.log(entrada.monedas);
        console.log(resultado);
    }

    seleccionarMonedas(cambio: number, monedas: number[], tabla: number[][]) {
        let i = monedas.length - 1;
        let j = cambio;
        let seleccion : number[] = [];
        for (let i = 0; i < monedas.length; i++) {
            seleccion[i] = 0;
        }
        while(j > 0) {
            if(i > 0 && tabla[i][j] == tabla[i - 1][j]) {
                i --;
            } else {
                seleccion[i] = seleccion[i] + 1;
                j -= monedas[i];
            }
        }
        return seleccion;

    }

}