/**
 *Controller for index.js
 *
 * @class DropBoxController
 */
class DropBoxController{

    //#region Default constructor
    
    constructor(){

        // Select the "Send file" button
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        // Select the input
        this.inputFilesEl = document.querySelector('#files');
        // Selec the snackbar
        this.snackModalEl = document.querySelector('#react-snackbar-root');
        // Initialize the events
        this.initEvents();

    }

    //#endregion

    //#region Methods

    
    /**
     *Initialize the buttons events
     *
     * @memberof DropBoxController
     */
    initEvents(){

        //Adds the click event on btnSendFileEl
        this.btnSendFileEl.addEventListener('click', event => {

            //Show the input file window
            this.inputFilesEl.click();

        });

        // Adds the change event to upload bar
        this.inputFilesEl.addEventListener('change', event => {

            // show the upload bar
            this.snackModalEl.style.display = 'block';

        });
    }

    //#endregion
}