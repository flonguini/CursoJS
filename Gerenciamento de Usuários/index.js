var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};

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

console.log(user);