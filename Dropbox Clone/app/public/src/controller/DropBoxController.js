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
        // Select the snackbar
        this.snackModalEl = document.querySelector('#react-snackbar-root');
        // Select the progress bar
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');
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


    /**
     *Upload the files to the server
     *
     * @param {*} files files to upload
     * @returns the promises for each file
     * @memberof DropBoxController
     */
    uploadTask(files){

        // collection with promises for each file
        let promises = [];

        // convert the collection to array
        [...files].forEach(file => {

            // create a promises for each position inside the array
            promises.push(new Promise((resolve, reject) => {

                // create new instance of XMLHttpRequest()
                let ajax = new XMLHttpRequest();

                // Open the connection
                ajax.open('POST', '/upload');

                // on ajax finish
                ajax.onload = event => {

                    try{
                    
                        // Resolve the server response
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

                // event to send the bytes send the server
                ajax.upload.onprogress = event => {

                    // pass to the method the event and the file properties
                    this.uploadProgress(event, file);

                }

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

    // Change the progress bar percentage
    uploadProgress(event, file){

        // the total bytes send
        let loaded = event.loaded;
        // the total bytes of the file
        let total = event.total;
        // the percente send
        let percent = parseInt((loaded / total) * 100);
        // change de progress bar width
        this.progressBarEl.style.width = `${percent}%`;

    }

    //#endregion
}