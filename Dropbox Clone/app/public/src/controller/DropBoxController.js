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
        // Select the file's name
        this.nameFileEl = this.snackModalEl.querySelector('.filename');
        // Select the time left to upload the file
        this.timeLeftEl = this.snackModalEl.querySelector('.timeleft');
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

            // Show the progress bar
            this.modalShow();

            // reset the progress bar
            this.inputFilesEl.value = '';
        });
    }



    /**
     * Show or hide the progress bar
     *
     * @param {boolean} [show=true] 
     * @memberof DropBoxController
     */
    modalShow(show = true){
        this.snackModalEl.style.display = (show) ? 'block' : 'none';
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

                    // hide the progress bar
                    this.modalShow(false);

                    try{
                    
                        // Resolve the server response
                        resolve(JSON.parse(ajax.responseText));
                    
                    } catch(e){

                        // hide the progress bar
                         this.modalShow(false);
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

                // Save the time that stats upload the files
                this.startUploadTime = Date.now();

                // send the file to the server
                ajax.send(formData);

            }));

        });

        // return every resolve for each promises created
        return Promise.all(promises);

    }

    
    /**
     * Update the progress bar
     *
     * @param {*} event the events
     * @param {*} file the properties of the file
     * @memberof DropBoxController
     */
    uploadProgress(event, file){

        // the total bytes send
        let loaded = event.loaded;
        // the total bytes of the file
        let total = event.total;
        // the percente send
        let percent = parseInt((loaded / total) * 100);
        // the time spent to upload the file
        let timeSpent = Date.now() - this.startUploadTime;
        // time left to upload
        let timeLeft = ((100 - percent) * timeSpent) / percent;
        // change de progress bar width
        this.progressBarEl.style.width = `${percent}%`;
        // Change the file name
        this.nameFileEl.innerHTML = file.name;
        // change the time left to upload
        this.timeLeftEl.innerHTML =  this.formatTimeToHuman(timeLeft);
    }


    
    /**
     *format the time in ms to h:m:s
     *
     * @param {*} duration the total duration to upload
     * @returns string formated with estimaed time to upload
     * @memberof DropBoxController
     */
    formatTimeToHuman(duration){
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000*60)) % 60);
        let hours = parseInt((duration / (1000*60*60)) % 24);

        if (hours > 0) {
            return `${hours} horas ${minutes} minutos e ${seconds} segundos`;
        }
        if (minutes > 0) {
            return `${minutes} minutos e ${seconds} segundos`;
        }
        if (seconds > 0) {
            return `${seconds} segundos`;
        }
        return '';
    }

    //#endregion
}