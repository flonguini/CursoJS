class UserController{
    
    constructor(formID,tableId){
        this.formEl = document.getElementById(formID);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
        this.onEditCancel();
    }

    onEditCancel(){
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{
            this.showPanelCreate();
        });
    }

    getValues(){

        let user = {};
        let isValid = true;
        // Faz uma iteração em todos os campos
        [...this.formEl.elements].forEach(function(field){ //converte o objeto em array por meio do spread

            if (['name','email','password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;
            }
        //Verifica se o campo é o campo gender
        if (field.name == 'gender') 
        {
            // verifica se o campo está selecionado
            if (field.checked) 
                user[field.name] = field.value; // adiciona o campo ao json
        } else if (field.name == "admin"){
            user[field.name] = field.checked;
        }
        else // Caso não esteja selecionado
        {
            user[field.name] = field.value; // adiciona o campo ao json
        }

        });

        if (!isValid){return false;}
        
        return new User(user.name, user.gender, user.birth, user.country, user.password, user.photo, user.admin);
    }

    onSubmit(){
        
        this.formEl.addEventListener("submit", event => {
            
            event.preventDefault(); // cancela o comportamento padrão dos formulário
            
            let btn = this.formEl.querySelector("[type=submit]");
            btn.disabled = true;

            let values = this.getValues(); 
            
            if (!values) return false;

            this.getPhoto().then(
                (content) => {
                    values.photo = content;
                    this.addLine(values);
                    this.formEl.reset();
                    btn.disabled = false;
                }, 
                (e) => {
                    console.error(e);
                }
                );
        });
            
    }

    getPhoto(){

        return new Promise((resolve,reject) => {

            let fileReader = new FileReader();
    
            //filtra o elemento com photo
            let elements = [...this.formEl.elements].filter(item =>{
                if (item.name === 'photo') {
                    return item;
                }
            });
    
            let file = elements[0].files[0];
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (e) =>{
                reject(e);
            }
            
            if(file){ 
                fileReader.readAsDataURL(file);
            }else{
                resolve('dist/img/boxed-bg.jpg'); // caso nenhuma imagem for selecionada retorna essa padrão
            }
        });

    }

    addLine(dataUser){

        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);
      
        //Template para inserir uma linha na tabela
        tr.innerHTML = `
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${(dataUser.admin) ? 'sim' : 'não'}</td>
        <td>${Utils.dateFormat(dataUser.register)}</td>
        <td>
            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
        `;

        tr.querySelector(".btn-edit").addEventListener("click", e=>{
            
            JSON.parse(tr.dataset.user);
            this.showPanelUpdate();

        });

        this.tableEl.appendChild(tr);

        this.updateCount();
        
    }

    showPanelCreate(){
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";
    }

    showPanelUpdate(){
        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";
    }

    updateCount(){
        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr=>{
            numberUsers++;
            let user = JSON.parse(tr.dataset.user)
            if (user._admin) {
                numberAdmin++;
            }
        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }

}