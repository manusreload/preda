export default abstract class Algoritmo<Entrada, Salida> {
    abstract test() : void;
    abstract ejecutar(entrada: Entrada): Salida;
}