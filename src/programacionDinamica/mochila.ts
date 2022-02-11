import Algoritmo from "../algoritmo";

type Ensayo = {volumenes: number[], beneficio: number[], capacidad: number}

export default class Mochila extends Algoritmo<Ensayo, any> {
    test(): void {
        
        this.ejecutar({volumenes: [1,2,5,6], beneficio: [1,5,15,20], capacidad: 12})
    }
    ejecutar(entrada: Ensayo) {
        let tabla : number[][] = [];
        for (let index = 0; index <= entrada.volumenes.length; index++) {
            tabla[index] = [];
            tabla[index][0] = 0;
            for (let i = 0; i <= entrada.capacidad; i++) {
                tabla[index][i] = 0;
            }
        }

        for (let index = 0; index < entrada.volumenes.length; index++) {
            const vol = entrada.volumenes[index];
            const ben = entrada.beneficio[index];
            let disponible = index + 1;
            for (let i = 0; i < entrada.capacidad; i++) {
                if(i + 1 >= vol) {
                    
                    tabla[index + 1][i + 1] = Math.max(tabla[index][i + 1], tabla[index][i - entrada.volumenes[index] + 1] + ben);
                } else {
                    tabla[index + 1][i + 1] = tabla[index][i + 1];
                }
            }
        }
        console.table(tabla);
    }

}