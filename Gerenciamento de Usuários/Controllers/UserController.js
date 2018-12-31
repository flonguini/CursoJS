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
            
            let values = this.getValues(); 
            
            this.getPhoto((content)=> {
                
                values.photo = content;
                this.addLine(values);
            });
        });
            
    }

    getPhoto(callback){
        let fileReader = new FileReader();

        //filtra o elemento com photo
        let elements = [...this.formEl.elements].filter(item =>{
            if (item.name === 'photo') {
                return item;
            }
        });

        let file = elements[0].files[0];

        fileReader.onload = () => {
            callback(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    addLine(dataUser){
        //Template para inserir uma linha na tabela
        this.tableEl.innerHTML = 
        `
            <tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        `;
    }

    // adiciona mais uma linha a tabela


}