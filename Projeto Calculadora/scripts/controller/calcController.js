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
        
        // Initialize the calculator
        this.initialize();

        // The events for every button
        this.initButtonsEvents();
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

    //Create the buttons events
    initButtonsEvents(){

        // Select all the buttons and parts from the DOM
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        //For each buttons adds a click event
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                console.log(btn.className.baseVal.replace("btn-",""));
            })
            
            //Change the cursor to a hand
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
        
    }

    // Add an array of events
    addEventListenerAll(element, events, fn){
        
        //Slips the events into an array
        events.split(' ').forEach(event => { //for each element adds the event
            element.addEventListener(event, fn, false);
        }

        );
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