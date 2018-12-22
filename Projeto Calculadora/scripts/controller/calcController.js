 class CalcController
 {
    
    //Construtor padrão da classe CalcController
    constructor()
    {
        this._displayCalc = "0"; // atributo privado
        this._dataAtual;         // atributo privado
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
        return this._dataAtual;
    }

    //set do field dataAtual
    set dataAtual(valor){
        this._dataAtual = valor;
    }

}