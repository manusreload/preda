import Algoritmo from "../algoritmo";
import Lista from "../dataStructures/lista";

type Ensayo = {clase: number[][]}
export default class Alumnos extends Algoritmo<Ensayo, any> {
    seed = 1;
    test(): void {
        let filas = 8;
        let columnas = 8;
        let lista = Lista.listaVacia();

        let ensayo :Ensayo = {clase: []}
        for (let i = 0; i < filas; i++) {
            ensayo.clase[i] = [];
            for (let j = 0; j < columnas; j++) {
                ensayo.clase[i][j] = Math.floor(this.random() * 80) + 130;
            }
        }
        this.ejecutar(ensayo)
        
        let str = "";
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                str += " [" + ensayo.clase[i][j] + "] ";
            }
            str += "\n";
        }

        console.log(str);

    }
    ejecutar(entrada: Ensayo) {
        this.a(entrada);
        this.b(entrada);

    }

    a(entrada:Ensayo) {
        for (let i = 0; i < entrada.clase.length; i++) {
            entrada.clase[i] = entrada.clase[i];
            this.ordenacion(entrada.clase[i], 0, entrada.clase[i].length - 1);
        }
    }

    b(entrada: Ensayo) {
        let list = [];
        
        let filas = entrada.clase.length;
        let columnas = entrada.clase[0].length;
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                list.push(entrada.clase[i][j]);
            }
        }
        let inicio = 0; 
        let fin = filas * columnas;
        this.fusion(list, inicio, columnas, fin - 1);

        let str = "";
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                str += " [" + list[j + (i * columnas)] + "] ";
            }
            str += "\n";
        }

        console.log(str);
    }

    ordenacion(v: number[], begin: number, end: number) {
       if(begin >= end) {
           return;
       }
       let mid = Math.floor(begin + (end - begin) / 2);
       this.ordenacion(v, begin, mid);
       this.ordenacion(v, mid + 1, end);
       this.fusion(v, begin, mid, end);

    }

    fusion(array: number[], left: number, mid: number, right: number) {
        
        const subArrayOne = mid - left + 1;
        const subArrayTwo = right - mid;
        
        // Create temp arrays
        let leftArray : number[] = []// new int[subArrayOne];
        let rightArray : number[] = []//new int[subArrayTwo];
    
        // Copy data to temp arrays leftArray[] and rightArray[]
        for (let i = 0; i < subArrayOne; i++)
            leftArray[i] = array[left + i];
        for (let j = 0; j < subArrayTwo; j++)
            rightArray[j] = array[mid + 1 + j];
    
        let indexOfSubArrayOne = 0, // Initial index of first sub-array
            indexOfSubArrayTwo = 0; // Initial index of second sub-array
        let indexOfMergedArray = left; // Initial index of merged array
    
        // Merge the temp arrays back into array[left..right]
        while (indexOfSubArrayOne < subArrayOne && indexOfSubArrayTwo < subArrayTwo) {
            if (leftArray[indexOfSubArrayOne] <= rightArray[indexOfSubArrayTwo]) {
                array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
                indexOfSubArrayOne++;
            }
            else {
                array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];
                indexOfSubArrayTwo++;
            }
            indexOfMergedArray++;
        }
        // Copy the remaining elements of
        // left[], if there are any
        while (indexOfSubArrayOne < subArrayOne) {
            array[indexOfMergedArray] = leftArray[indexOfSubArrayOne];
            indexOfSubArrayOne++;
            indexOfMergedArray++;
        }
        // Copy the remaining elements of
        // right[], if there are any
        while (indexOfSubArrayTwo < subArrayTwo) {
            array[indexOfMergedArray] = rightArray[indexOfSubArrayTwo];
            indexOfSubArrayTwo++;
            indexOfMergedArray++;
        }
    }

    private random() {
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

}