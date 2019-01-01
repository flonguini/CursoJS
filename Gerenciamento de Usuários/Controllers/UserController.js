class UserController{
    
    constructor(formID,tableId){
        this.formEl = document.getElementById(formID);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
    }

    getValues(){

        let user = {};
        // Faz uma iteração em todos os campos
        [...this.formEl.elements].forEach(function(field){ //converte o objeto em array por meio do spread
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
        
        return new User(user.name, user.gender, user.birth, user.country, user.password, user.photo, user.admin);
    }

    onSubmit(){
        
        this.formEl.addEventListener("submit", event => {
            
            event.preventDefault(); // cancela o comportamento padrão dos formulário
            
            let btn = this.formEl.querySelector("[type=submit]");
            btn.disabled = true;

            let values = this.getValues(); 
            
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
      
        //Template para inserir uma linha na tabela
        tr.innerHTML = `
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${(dataUser.admin) ? 'sim' : 'não'}</td>
        <td>${dataUser.register}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
        `;

        this.tableEl.appendChild(tr);
        
    }

    // adiciona mais uma linha a tabela


}