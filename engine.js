const keyboard = document.getElementById("teclado");

const rightword = [];
const wrongword = [];

keyboard.addEventListener("click", teclaPressionada);
document.addEventListener("keydown", teclaPressionada);

secretWord = "TESTE";

function teclaPressionada(evento) {
  //   if (!evento.keyCode) {
  //     console.log(`Clicou em ${evento.target.id}`);
  //   } else {
  //     console.log(`Apertou a tecla ${evento.key} de código ${evento.keyCode} `);
  //   }

  // Verifica qual dos dois eventos foi utilizado.
  // O que retorna null/undefine é ignorado.
  let letra = evento.key ?? String.fromCharCode(evento.target.id);
  // Converte para maíuscula a letra clicada ou digitada
  letra = letra.toUpperCase();

  // Verifica se a letra clicada/pressionada esta na palavra secreta.
  if (secretWord.includes(letra)) {
    // Verifica se a letra correta esta inclusa na relação de palabras corretas.
    // Caso já esteja, não adiciona novamente a mesma letra.
    if (!rightword.includes(letra)) {
      // Caso a letra não esteja na lista de palavras corretas,
      // a mesma é adicionada.
      rightword.push(letra);
      console.log("Letra Correta: " + rightword);
    }
  } else {
    // Verifica se a letra errada esta inclusa na relação de palabras erradas.
    // Caso já esteja, não adiciona novamente a mesma letra.
    if (!wrongword.includes(letra)) {
      // Caso a letra não esteja na lista de palavras erradas,
      // a mesma é adicionada.
      wrongword.push(letra);
      console.log("Letra Errada: " + wrongword);
    }
  }
}
