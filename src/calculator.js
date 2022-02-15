/**
 * Clase principal que se encarga del flujo de la calculadora
 */
class Calculadora {

    static operacionTotal = 0;
    static previousOperator;
    static valorActual = "0";
    static valorAnterior = "0";


    static buttonClick = e => {
        const value = e.target.innerText;
        isNaN(parseInt(value)) ? this.handleSymbol(value) : this.handleNumber(value);
        this.actualizar();
    }

    static borrarTotal = () => {
        this.valorActual = "0";
        this.operacionTotal = 0;
    }

    static sumar = intValorActual => this.operacionTotal += intValorActual;
    static restar = intValorActual => this.operacionTotal -= intValorActual;
    static dividir = intValorActual => this.operacionTotal /= intValorActual;
    static multiplicar = intValorActual => this.operacionTotal *= intValorActual;

    static flushOperation = intValorActual => {

        if (this.previousOperator !== null){
            const operations = {
                "+": intValorActual => this.sumar(intValorActual),
                "-": intValorActual => this.restar(intValorActual),
                "×": intValorActual => this.multiplicar(intValorActual),
                "÷": intValorActual => this.dividir(intValorActual)
            }
            return operations[this.previousOperator](intValorActual);
        }
    }

    static resultado = () => {
        if (this.valorActual !== "0"){
            (this.flushOperation(parseInt(this.valorActual)));
            this.previousOperator = null; 
            this.valorActual = +this.operacionTotal;
        }
    }

    static borrar = () => {
        const valorActualString = this.valorActual.toString();
        (valorActualString.length === 1) ? this.valorActual = "0" : this.valorActual = valorActualString.substring(0, valorActualString.length - 1);
    }

    static handleSymbol = value => {

        if (value.length === 1){
                const operations = {
                    "C": value => this.borrarTotal(value),
                    "=": value => this.resultado(value),
                    "←": value => this.borrar(value),
                    "+": value => this.handleMath(value),
                    "-": value => this.handleMath(value),
                    "×": value => this.handleMath(value),
                    "÷": value => this.handleMath(value),
                }
                return operations[value](value);
        }
    }

    static handleNumber = value => {
        if (this.valorActual.length < 11) return (this.valorActual === '0') ? this.valorActual = value : this.valorActual += value;        
    }

    static handleMath = value => {   
        if (this.valorActual === "0") return;
        const intValorActual = Number(this.valorActual);

        (this.operacionTotal === 0) ? this.operacionTotal = intValorActual : this.flushOperation(intValorActual);
        this.valorActual += value;
        this.previousOperator = value;
        this.valorActual = "0";
    }

    static actualizar = () => {     
        const screen = document.querySelector("#screen");
        screen.innerHTML = this.valorActual;
    }
};

const init = () => {
    const screen = document.querySelector("#screen");
    document.querySelector(`#calc-buttons`).addEventListener(`click`, Calculadora.buttonClick);
    screen.innerHTML = Calculadora.valorActual;
}

init();