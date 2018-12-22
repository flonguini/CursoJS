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

//Estrutura if

let cor = 'verde';

if (cor ==='verde') {
    console.log('Siga')
}else if (cor === 'amarelo'){
    console.log('Atenção')
}else{
    console.log('Pare')
}

//estrutura switch

cor = 'sadasd'

switch (cor) {
    case "verde":
        console.log("cor verde: passe")
        break;
    case "amarelo":
        console.log("cor amarela: atenção")
        break;
    case "vermelho":
        console.log("cor vermelho: pare")
        break;
    //opcional
    default:
        console.log("nenhuma das anteriores")
}

//estrutura for
// break para, continue ignora a iteração

let n = 5;

for (let i = 0; i<=10; i++){
    //o que está dentro {} pode ser inserido uma instrução JS
    if (i == 7) {
        continue
    }else{
    console.log(`${i} x ${n} = ${i*n}`); //template string
    }
}
