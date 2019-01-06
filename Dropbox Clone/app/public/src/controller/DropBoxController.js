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

        //Add the click event on btnSendFileEl
        this.btnSendFileEl.addEventListener('click', event => {

            //Show the input file window
            this.inputFilesEl.click();

        });

        // Add the change event to upload bar
        this.inputFilesEl.addEventListener('change', event => {

            // Call the upload task with the selected itens
            this.uploadTask(event.target.files);

            // show the upload bar
            this.snackModalEl.style.display = 'block';

        });
    }


    uploadTask(files){

        // collection with primises for each file
        let promises = [];

        // convert the collection to array
        [...files].forEach(file => {

            // create a promises for each position inside the array
            promises.push(new Promise((resolve, reject) => {

                // create new instance of XMLHttpRequest()
                let ajax = new XMLHttpRequest();

                // send the files by POST 
                ajax.open('POST', '/upload');

                ajax.onload = event => {

                    try{
                    
                        // Resolve the server respost
                        resolve(JSON.parse(ajax.responseText));
                    
                    } catch(e){

                        // Case something wrong happend, reject the promise
                        reject(e);
                    }

                    // If onload throw an error
                    ajax.onerror = event => {

                        // reject the promise
                        reject(event);

                    }

                };

                // create new instance of FormData
                let formData = new FormData();

                // append the current file to formData
                formData.append('input-file', file);

                // send the file to the server
                ajax.send(formData);

            }));

        });

        // return every resolve for each promises created
        return Promise.all(promises);

    }

    //#endregion
}