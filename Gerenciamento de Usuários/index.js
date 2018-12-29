var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};

// adiciona mais uma linha a tabela

function addLine(dataUser){
    var tr = document.createElement("tr");
    tr.innerHTML = `
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
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

    document.getElementById("table-users").appendChild(tr);
}

// eventos

document.getElementById("form-user-create").addEventListener("submit", function(event){
    event.preventDefault(); // cancela o comportamento padrão dos formulário
    // Faz uma iteração em todos os campos
    fields.forEach(function(field, index){
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
        // Exibe no console
        //  console.log(field.name);
    });
    
    addLine(user);
});