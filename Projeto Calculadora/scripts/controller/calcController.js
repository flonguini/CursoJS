 class CalcController
 {
    
    //Construtor padrão da classe CalcController
    constructor()
    {
        this._displayCalc = "0"; // atributo privado
        this._currentDate;         // atributo privado
        this.initialize();
    }

    //Manipulação do DOM
    initialize(){
        //seleção dos elementos HTML
        let displayeCalcEl = document.querySelector("#display") // seleciona o número que está no display da calculadora
        let dateEl = document.querySelector("#data") // seleciona o número que está na data da calculadora
        let timeEl = document.querySelector("#hora") // seleciona o número que está na hora da calculadora

        displayeCalcEl.innerHTML = "4567";
        dateEl.innerHTML = "01/05/2018";
        timeEl.innerHTML = "00:00";
    }

    //Get do field displayCalc
    get displayCalc(){
        return this._displayCalc;
    }

    //Set do field displayCalc
    set displayCalc(valor){
        this._displayCalc = valor;
    }

    //Get do field dataAtual
    get dataAtual(){
        return this._currentDate;
    }

    //set do field dataAtual
    set dataAtual(valor){
        this._currentDate = valor;
    }
}