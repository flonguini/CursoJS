 class CalcController
 {

    //#region  Default Constructor

    //Construtor padrão da classe CalcController
    constructor()
    {
        // The location to display date and time
        this._locale = 'pt-BR';
        
        // Select the DOM elements
        this._displayCalcEl = document.querySelector('#display'); // Display numbers
        this._dateEl = document.querySelector('#data'); // Display date
        this._timeEl = document.querySelector('#hora'); // Display time
        
        // The current date
        this._currentDate;
        
        // Inicialize the calculator
        this.initialize();
    }

    //#endregion

    //#region Methods

    initialize(){

        // Initialize the display date and time
        this.setDisplayDateTime();

        //Refresh the date and time every 1000ms
       setInterval(() => {
            this.setDisplayDateTime(); // call the setDisplayDateTime time
        }, 1000);

        /*
        // Pausa o set interval
        setTimeout(() => {
            clearInterval(interval); // var interval = setInterval...
        }, 5000);*/
    }

    initButtonsEvents(){
        document.querySelector("#buttons > g, #parts > g");
    }

    // Sets the date and time for a specific location
    setDisplayDateTime(){
        //Change the display date 
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        // Change the display time
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    //#endregion

    //#region Getters

    // Gets the _displayCalc value
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    // Gets the _currentDate value
    get currentDate(){
        return new Date();
    }

    // Gets the display time
    get displayTime(){
        return this._timeEl.innerHTML;
    }

    // Gets the display date
    get displayDate(){
        return this._dateEl.innerHTML;
    }

    //#endregion

    //#region Setters

    // Sets the _displayCalc value
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    // Sets the _currentDate value
    set actualDate(value){
        this._currentDate = value;
    }

    // Sets the display time
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    // Sets the display date
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    //#endregion
}