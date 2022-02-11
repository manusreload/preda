export default abstract class Algoritmo<Entrada, Salida> {
    abstract test() : void;
    abstract ejecutar(entrada: Entrada): Salida;

    private timers : any = {};

    timer(tag: string) {
        this.timers[tag] = new Date().getTime();
    }

    stop(tag: string) {
        return (new Date().getTime()) - this.timers[tag];

    }
}