const keyboard = document.getElementById("teclado");

const rightword = [];
const wrongword = [];

keyboard.addEventListener("click", teclaPressionada);
document.addEventListener("keydown", teclaPressionada);

secretWord = "TESTE";

// Retorna verdadeiro se o caracter pressionado é 
// um código entre a letra A e a letra Z.
function isCaracter(keyCaracter) {
  return keyCaracter >=65 && keyCaracter <= 90;
}

function teclaPressionada(evento) {
  // Verifica qual dos dos dois eventos foi utilizado:
  // tecla pressioada ou click em um botão.
  // E retorna o código da tecla ou botão clicado.
  const keyPressClick = parseInt(evento.keyCode ?? evento.target.id);
  

  // Verifica se o código do evento é um caracter válido.
  if (isCaracter(keyPressClick)) {

    // Converte códgo para caracter e
    // converte para maíuscula a letra clicada ou digitada.
    const letra = String.fromCharCode(keyPressClick).toUpperCase();

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
}

