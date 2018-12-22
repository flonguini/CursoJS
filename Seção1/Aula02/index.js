// Define uma função em JS
function somar(x1, x2, operador){
    return eval(`${x1} ${operador} ${x2}`); //eval calcula o valor dentro de uma string
}

var resultado = somar(2, 5, "+");

console.log(resultado);

// Função anônima (não possui nome)
//Definição
(function(x1,x2,operador){
    return eval(`${x1} ${operador} ${x2}`);
})(2, 7, "+");

// Utilização FA
console.log((function(x1,x2,operador){
    return eval(`${x1} ${operador} ${x2}`);
})(2, 7, "+"));

// Arrow functions (semelhante a lambda functions em c#)
let calc = (x1, x2, operador) => {
    return eval(`${x1} ${operador} ${x2}`); //eval calcula o valor dentro de uma string
}

var resultado = calc(2, 5, "*");

console.log(resultado);

/**
 * Eventos
 */

 //Exibe no consele quando a janela fica em foco no windows
 window.addEventListener('focus', event => {
     console.log("focus");
 });

//Exibe no console quando o usuário clica no site
 window.addEventListener('click', event => {
    console.log("click");
});

/**
 * Time stamp
 */

let agora = new Date();

console.log(agora);
console.log(agora.getDate()); // recebe o dia
console.log(agora.getFullYear()); // recebe o ano
console.log(agora.getMonth()); //recebe o mês

console.log(agora.toLocaleDateString("pt-BR"));//formata no padrão BR