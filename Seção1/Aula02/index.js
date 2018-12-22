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