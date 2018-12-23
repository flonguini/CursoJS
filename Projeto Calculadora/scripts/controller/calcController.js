 class CalcController
 {

    //#region  Default Constructor

    //Construtor padrão da classe CalcController
    constructor()
    {
        this._displayCalc = "0";
        this._currentDate;
        this.initialize();
    }

    //#endregion

    //#region Methods

    initialize(){
        //Seleciona os elementos do DOM
        let displayCalcEl = document.querySelector('#display')
        let dateEl = document.querySelector('#data')
        let timeEl = document.querySelector('#hora')

        displayCalcEl.innerHTML = "4567";
        dateEl.innerHTML = "12/12/2012";
        timeEl.innerHTML = "23:59:54";
    }

    //#endregion

    //#region Getters

    // Gets the _displayCalc value
    get displayCalc(){
        return this._displayCalc;
    }

    // Gets the _currentDate value
    get actualDate(){
        return this._currentDate;
    }

    //#endregion

    //#region Setters

    // Sets the _displayCalc value
    set displayCalc(value){
        this._displayCalc = value;
    }

    // Sets the _currentDate value
    set actualDate(value){
        this._currentDate = value;
    }

    //#endregion
}