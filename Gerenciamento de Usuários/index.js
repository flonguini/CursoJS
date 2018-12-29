// Nome do formulário
let name = document.querySelector('#exampleInputName');

// Seleciona apenas o radio button selecionado
let gender = document.querySelectorAll('#form-user-create [name=gender]:checked');

// Seleciona a data de nascimento
let birth = document.querySelector('#exampleInputBirth');

// Seleciona o email
let email = document.querySelector('#exampleInputEmail');

// Seleciona a senha
let password = document.querySelector('#exampleInputPassword');

// Seleciona a photo
let photo = document.querySelector('#exampleInputFile');

// Seleciona o checkbox
let admin = document.querySelector('#exampleInputAdmin');

// Seleciona todos dos campos que tem a propriedade name dentro do #form-user-create
var fields = document.querySelectorAll('#form-user-create [name]');

// Faz uma iteração em todos os campos
fields.forEach(function(field, index){
    //Verifica se o campo é o campo gender
    if (field.name == 'gender') 
    {
        // verifica se o campo está selecionado
        if (field.checked) console.log('sim', field);
    }
    else // Caso não esteja selecionado
    {
        console.log('não');
    }
    // Exibe no console
    // console.log(field.name);
});