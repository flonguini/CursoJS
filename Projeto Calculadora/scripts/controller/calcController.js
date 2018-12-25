 class CalcController
 {

    //#region  Default Constructor

    //Construtor padrão da classe CalcController
    constructor()
    {
        this._lastOperator = '';
        this._lastNumber = '';
        //The operations that will be executed
        this._operation = [];

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

        //The events for the keyboard
        this.initKeyboard();

        //The event for paste function
        this.pasteFromClipboard();
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

    //Copy the valeu from calc display
    copyToClipBoard(){
        let input = document.createElement('input') //cria elemento na tela dinamicamente;
        
        //insere dentro do input o valor que está no display
        input.value = this.displayCalc;

        //adiciona ao corpo do html o input
        document.body.appendChild(input);

        //seleciona o valor do campo input
        input.select();

        //copia o valor selecopnado
        document.execCommand("Copy");

        //Oculta o input
        input.remove();
    }

    //Paste the value to the calc display
    pasteFromClipboard(){
        document.addEventListener('paste', e=>{
            let text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);
        });
    }

    //Initialize the keyboards events
    initKeyboard(){
        document.addEventListener('keyup', e=>{
            
            switch (e.key) {
                //Case the user press the AC button
                case 'Escape':
                    this.clearAll();
                    break;
                
                //Case the user press the CE button
                case 'Backspace':
                    this.clearEntry();
                    break;
                
                //Case the user press the + button                
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;

                //Case the user press the = button
                case 'Enter':
                case '=':
                    this.calc();
                    break;
    
                //Case the user press the . button
                case '.':
                case ',':
                    this.addDot();
                    break;
    
                //Case the user press one number button
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;
                case 'c':
                    if (e.ctrlKey) {
                        this.copyToClipBoard();
                    }
                    break;
            }
        });
    }

    //Clear all the display
    clearAll(){
        //remove all operations
        this._operation = []; 
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumbertoDisplay();
    }

    //Clear the last entry
    clearEntry(){
        //remove the last operation
        this._operation.pop(); //.pop remove a última entrada do array
        this.setLastNumbertoDisplay();
    }

    // Return the las operation entered by the user
    getLastOperation(){
        return this._operation[this._operation.length-1]
    }

    // Returns if the item is and operator
    isOperator(value){
        //Check if the value is inside the array, if not returns -1
        return(['+','-','*','/','%'].indexOf(value) > -1);
    }

    //Change the operator
    setLastOperation(value){
        this._operation[this._operation.length-1] = value
    }

    // Adds the operation to _operation array
    pushOperation(value){
        this._operation.push(value);

        //In case the _operation has the full expresstion
        if (this._operation.length > 3) {
            //evaluate the last expression
            this.calc();
        }
    }

    //Returns the last number or last operator
    getLastItem(isOperator = true){

        let lastItem;

        for (let i = this._operation.length - 1; i>= 0; i--){
            if (isOperator) {
                if (this.isOperator(this._operation[i])) {
                    lastItem = this._operation[i];
                    break;
                }
            }else {
                if (!this.isOperator(this._operation[i])) {
                    lastItem = this._operation[i];
                    break;
                }
            }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    //Display the last number 
    setLastNumbertoDisplay(){

        //Get the last number
        let lastNumber = this.getLastItem(false);
        
        //if the array is empty display 0
        if(!lastNumber) lastNumber = 0;

        //Display the last number
        this.displayCalc = lastNumber;
    }

    //
    getResult(){
        return eval(this._operation.join(""));
    }

    //Evaluate the last expression
    calc(){
        // Initialize the las variable as empty
        let last = '';

        //Save the last operator
        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }
       
        // Case the _operation have more than 3 elements
        if (this._operation.length > 3) {
            // remove the las element
            last = this._operation.pop();

            //Evaluate the expression
            this._lastNumber = this.getResult();

        }else if (this._operation.length == 3) { // case the user enter (3+5)
            
            //save the last number
            this._lastNumber = this.getLastItem(false);
        } 
        
        //Evaluate the expression
        let result = this.getResult();
        
        //Case the operation is percentage
        if (last == '%') {
            result /= 100;
            this._operation = [result];
        }else{
            //change the _operation to the evaluated operation and the last operator
            this._operation = [result]

            if (last) this._operation.push(last);
        }

        //Update the display
        this.setLastNumbertoDisplay();
    }

    //Add one more operation
    addOperation(value){
        //Verify if the last item enter is a number
        if (isNaN(this.getLastOperation())) {
            //If the last item is a string
            if (this.isOperator(value)) {
                //Change the operator
                this.setLastOperation(value);
            }else {
                //Add the number to _operation
                 this.pushOperation(value);
                 //Update the display
                this.setLastNumbertoDisplay();
            }

        } else { // Case the last item is a number

            if (this.isOperator(value)) {
                this.pushOperation(value);
            } else {
                //Concatenates the last values
                let newValue = this.getLastOperation().toString() + value.toString();
                //Add the value to _operation
                this.setLastOperation(newValue);
                //Update the display
                this.setLastNumbertoDisplay();
            }
        }

    }

    //Show Error on the display
    setError(){
        this.displayCalc = 'Error';
    }

    //Adds the dot to a number
    addDot(){
        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) {
            return;
        }

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        }else{
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumbertoDisplay();
    }

    //Execute the function of a button
    execBtn(value){

        switch (value) {
            //Case the user press the AC button
            case 'ac':
                this.clearAll();
                break;
            
            //Case the user press the CE button
            case 'ce':
                this.clearEntry();
                break;
            
            //Case the user press the + button                
            case 'soma':
                this.addOperation('+');
                break;

            //Case the user press the - button
            case 'subtracao':
                this.addOperation('-');
                break;

            //Case the user press the / button
            case 'divisao':
                this.addOperation('/');
                break;

            //Case the user press the X button
            case 'multiplicacao':
                this.addOperation('*');
                break;

            //Case the user press the % button
            case 'porcento':
                this.addOperation('%');
                break;

            //Case the user press the = button
            case 'igual':
                this.calc();
                break;

            //Case the user press the . button
            case 'ponto':
                this.addDot();
                break;

            //Case the user press one number button
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            //Case something wrong happened.
            default:
            this.setError();
                break;
        }
    }

    //Create the buttons events
    initButtonsEvents(){

        // Select all the buttons and parts from the DOM
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        //For each buttons adds a click event
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                // store the button class name
                let textBtn = btn.className.baseVal.replace("btn-","");

                //
                this.execBtn(textBtn);

            });

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