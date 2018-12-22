/* 
    Comentários em barra
*/

/**
 * Comentário com duas estrelas
 */

 var olaMundo = "Olá Mundo!"

 //Comentário
console.log(olaMundo)

console.log(typeof(olaMundo)) //mostra o tipo de variável

let a = 10; // variável com let existe apenas dentro do escopo
const b = "10";

console.log(a==b) // compara dois valores
console.log(a===b) // compara dois valores e o tipo
console.log(a!==b) // Diferente de (comparando os tipos também)
console.log(a!=b) // Diferente de
console.log(a!=b && typeof(b) == 'string')  // operador and
console.log(a!=b || typeof(b) == 'string')  // operador or

let cor = 'amarelo';

if (cor ==='verde') {
    console.log('Siga')
}else if (cor === 'amarelo'){
    console.log('Atenção')
}

else{
    console.log('Pare')
}