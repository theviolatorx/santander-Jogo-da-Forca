const keyboard = document.getElementById("teclado");

keyboard.addEventListener("click", keyPressOrclick);
document.addEventListener("keydown", keyPressOrclick);

let gameOver = false;
let tentativas = 0;
const rightletter = [];
const wrongletter = [];
// Palavra secreta
const secretWord = "CASA";
const lenSecretWord = secretWord.length;

window.addEventListener("load", (event) => {
  
  const eraseSpace = 9 - lenSecretWord;
  
  if (eraseSpace > 0){
    for(let i = lenSecretWord + 1; i <= 9; i++) {
      addClass("cps"+i, 'ocultar');
    }
  }
});


function keyPressOrclick(evento) {
  
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
      if (!rightletter.includes(letra)) {
        // Caso a letra não esteja na lista de palavras corretas,
        // a mesma é adicionada.
        rightletter.push(letra);
        showRightWord(secretWord, letra);
        console.log("Letra Correta: " + rightletter);
        gameOver = acertou(secretWord, rightletter);
      }
    } else {
      // Verifica se a letra errada esta inclusa na relação de palabras erradas.
      // Caso já esteja, não adiciona novamente a mesma letra.
      if (!wrongletter.includes(letra)) {
        gameOver = errou(tentativas);
        showWrongWord(letra);
        // Caso a letra não esteja na lista de palavras erradas,
        // a mesma é adicionada.
        wrongletter.push(letra);
        console.log("Letra Errada: " + wrongletter);
      }
    }
  }
  gameOverForca();
  
}

// Retorna verdadeiro se o caracter pressionado é 
// um código entre a letra A e a letra Z.
function isCaracter(keyCaracter) {
  return keyCaracter >=65 && keyCaracter <= 90;
}

function showRightWord(array, letter){
  array = array.split("");
  array.forEach(function(element, index, array) {
    if (element === letter){
      const posLetter = document.getElementById("cps"+(index + 1));
      posLetter.innerHTML = letter;
    }
  });
}

function showWrongWord(letter){
  console.log(tentativas);
  const posLetter = document.getElementById("cpse"+tentativas);
  posLetter.innerHTML = letter;

}

function gameOverForca(){
  console.log(gameOver);
  console.log(`Gameover: ${gameOver} / Tentativas: ${tentativas}`);
  if (gameOver && tentativas < 6) {
    alert("Jogo Acabou! Você ganhou!");
  } else if (gameOver && tentativas >=6) {
    alert("Jogo Acabou! Você perdeu!")
  }
}

function acertou(array1, array2){
  let acc = 0;
  array1 = array1.split("");
  
  array2.forEach((element1) =>{
    array1.forEach((element2) => {
    if (element2 === element1) {
      acc++;
    }
    });
  });
  if (acc >= array1.length) {
    return true;
  }
  return false;
}

function errou() {
  tentativas++;
  if (tentativas >= 6) {
    return true;
  }
  return false;
}

function addClass(id, classe) {
  const elemento = document.getElementById(id);
  const classes = elemento.className.split(' ');
  const getIndex = classes.indexOf(classe);

  if (getIndex === -1) {
    classes.push(classe);
    elemento.className = classes.join(' ');
  }
}

function delClass(id, classe) {
  var elemento = document.getElementById(id);
  var classes = elemento.className.split(' ');
  var getIndex = classes.indexOf(classe);

  if (getIndex > -1) {
    classes.splice(getIndex, 1);
  }
  elemento.className = classes.join(' ');
}