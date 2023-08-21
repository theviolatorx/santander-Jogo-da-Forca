/*
{
  Programa: "Jogo da Força",
  Versao: "2.0.0"
  Desenvolvedor: [
    "Thalia",
    "Clóvis",
  ]

*/

//
const keyboard = document.getElementById("teclado");
const tipText = document.getElementById("tips");
const splashAndGo = document.getElementById("splash");
const playAgain = document.getElementById("win-lose");

keyboard.addEventListener("click", keyPressOrclick);
document.addEventListener("keydown", keyPressOrclick);
splashAndGo.addEventListener("click", iniciarJogo);
playAgain.addEventListener("click", iniciarJogo);

let gameOver = false;
let tentativas = 0;
let rightletter = [];
let wrongletter = [];
let categoria_dicas;
let palavra;
let secretWord;
let tip;
let lenSecretWord;
let mensagem;
let intervalID;
let forcaPartsClean;
let hangingPartClean;

// Palavra secreta
const categorias = [
  "CIDADES",
  "LINGUAGENS",
  "ANIMAIS",
  "CRANIANA",
  "PROFISSOES PERIGOSAS",
  "FABRICANTES DE CELULAR",
  "FRUTAS",
  "CLIMA E TEMPO",
  "MEIOS DE TRANSPORTES",
];
const dicas = [
  "Cidades do litorial Sul de São Paulo",
  "Linguagens de programação antigas",
  "Animais quadrupedes domesticados",
  "Ossos que formam a caixa craniana",
  "Profissãos Perigosas e Insalubres",
  "As maiores vendedoras de celular no Brasil",
  "Frutas da região Nordeste do Brasil",
  "Clima e Tempo",
  "Meios de Transportes",
];
const palavras = {
  CIDADES: ["SANTOS", "PERUIBE", "MONGAGUA", "ITANHAEM"],
  LINGUAGENS: [
    "CLIPPER",
    "BASIC",
    "COBOL",
    "LISP",
    "PASCAL",
    "SMALLTALK",
    "ALGOL",
    "AUTOCODE",
  ],
  ANIMAIS: ["CACHORRO", "GATO", "CAVALO", "OVELHA", "PORCO"],
  CRANIANA: [
    "FRONTAL",
    "ESFENOIDE",
    "ETMOIDE",
    "NASAL",
    "MAXILA",
    "MANDIBULA",
    "OCCIPITAL",
    "TEMPORAL",
    "PARIETAL",
  ],
  "PROFISSOES PERIGOSAS": [
    "LIXEIRO",
    "POLICIAL",
    "MOTOBOY",
    "DUBLES",
    "ASTRONAUTA",
  ],
  "FABRICANTES DE CELULAR": [
    "SAMSUNG",
    "APPLE",
    "MOTOROLA",
    "XIAOMI",
    "LG",
    "ASUS",
    "REALME",
    "NOKIA",
    "HUAWEI",
    "GOOGLE",
  ],
  FRUTAS: [
    "CAJU",
    "ACEROLA",
    "GOIABA",
    "MANGABA",
    "UMBU",
    "CAJA",
    "PITANGA",
    "SIRIGUELA",
    "MARACUJA",
    "GRAVIOLA",
    "TAMARINDO",
    "JACA",
    "JENIPAPO",
    "PINHA",
    "ARACA",
    "PITOMBA",
    "BACABA",
    "MURICI",
  ],
  "CLIMA E TEMPO": [
    "SOL",
    "CHUVA",
    "NEVE",
    "VENTO",
    "NUVEM",
    "TROVAO",
    "RELAMPAGO",
    "ARCOIRIS",
    "GRANIZO",
    "GEADA",
    "NEBLINA",
    "CALOR",
    "FRIO",
    "FRESCO",
    "VENTANIA",
    "AURORA",
    "BRISA",
    "ORVALHO",
    "TORNADO",
  ],
  "MEIOS DE TRANSPORTES": [
    "CARRO",
    "AVIAO",
    "BARCO",
    "BICICLETA",
    "ONIBUS",
    "TREM",
    "MOTO",
    "SUBMARINO",
    "CAMINHAO",
    "VAN",
    "TRATOR",
    "CANOA",
    "BALAO",
    "PATINETE",
    "CARRUAGEM",
    "JIPE",
    "SKATE",
    "JETSKI",
  ],
};

/*
* Função para verificar os eventos de teclado e mouse.
* 
* @example
*   keyPressOrclick(event)

* @param {event} [opcional]   Tipo do evento.
* @return {undefined}         Essa função retorna undefined
*/
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
        addClass(keyPressClick, "corCerta");
        gameOver = acertou(secretWord, rightletter);
      }
    } else {
      if (!wrongletter.includes(letra)) {
        wrongletter.push(letra);

        // Aciona a exibição das partes da forca aqui
        if (wrongletter.length <= 6) {
          // Seleciona todos os elementos com a classe CSS "forca-parte"
          const forcaParts = document.getElementsByClassName("forca-parte");

          // Obtém a parte da forca correspondente ao número de letras erradas
          // Subtrai 1 porque os índices de array começam em 0
          const hangingPart = forcaParts[wrongletter.length - 1];

          // Torna a parte da forca visível definindo o estilo "display" como "block"
          hangingPart.style.display = "block";
        }
        gameOver = errou();
        showWrongWord(letra);
        addClass(keyPressClick, "corErrada");
      }
    }
  }
}
// gameOverForca();

/*
* Retorna verdadeiro se o caracter pressionado é um código entre a letra A e a letra Z.
* 
* @example
*   isCaracter(68); // true 

* @param  {number}  obrigatório   Tipo do evento.
* @return {boolean}               retorna true se o código do caracter estiver entre 65 e 90, caso contrário retorna false
*/
function isCaracter(keyCaracter) {
  return keyCaracter >= 65 && keyCaracter <= 90;
}

/*
 * Exibe os caracteres que existem na palavra secreta
 *
 * @example
 *   showRightWord("TESTE","S");
 *
 * @param {text}   obrigatório   Palavra secreta
 * @param {text}   obrigatório   Letra a ser localizada na palavra secreta
 * @return {undefined}           Essa função retorna undefined
 */
function showRightWord(array, letter) {
  array = array.split("");
  array.forEach(function (element, index, array) {
    if (element === letter) {
      const posLetter = document.getElementById("cps" + (index + 1));
      posLetter.innerHTML = letter;
    }
  });
}

/*
 * Exibe os caracteres que não existem na palavra secreta
 *
 * @example
 *   showRightWord("TESTE","X");
 *
 * @param {text}   obrigatório   Palavra secreta
 * @param {text}   obrigatório   Letra a ser localizada na palavra secreta
 * @return {undefined}           Essa função retorna undefined
 */
function showWrongWord(letter) {
  const posLetter = document.getElementById("cpse" + tentativas);
  posLetter.innerHTML = letter;
}

/* Verifica se o jogo finalizado ou não!
 *
 * @example
 *   gameOverForca();
 *
 * @param {}   Não precisa de argumentos
 * @return {undefined}  Essa função retorna undefined
 */
function gameOverForca() {
  if (gameOver && tentativas < 6) {
    mensagem = `<h1 class='titulo-do-jogo'>VOCÊ GANHOU!</h1><p>CLIQUE E CONTINUE JOGANDO</p>`;
    exibeTelaFimJogo(mensagem);
  } else if (gameOver && tentativas >= 6) {
    mensagem = `<h1 class='titulo-do-jogo'>VOCÊ PERDEU!</h1><p>A palavra secreta é: ${secretWord}</p>`;
    exibeTelaFimJogo(mensagem);
  }
}

function exibeTelaFimJogo(msg) {
  playAgain.innerHTML = mensagem;
  clearInterval(intervalID);
  addClass("container", "ocultar");
  delClass("win-lose", "ocultar");
}
/*
 * Verifica se o usuário acertou a palavra secreta.
 * Retorna True caso tenha acertado e False caso não tenha acertado
 *
 * @example
 *   acertou("TESTE","TESTE"); // true
 *
 * @param {text}         obrigatório   Palavra secreta
 * @param {array}        obrigatório   Array com todas as letras corretas digitadas pelo usuário
 * @return {true/false}                Essa função retorna true ou false
 */
function acertou(array1, array2) {
  let acc = 0;
  array1 = array1.split("");

  array2.forEach((element1) => {
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

/*
 * Soma mais 01 nas tentativas erradas do usuário e verifica a quantidade de erros do usuário.
 * Retorna True caso o número de erros seja maior ou igual a 6
 * Retorna True caso o número de erros seja menor que 6
 *
 * @example
 *   errou(); // true/false
 *
 * @param {null}         Sem parametros
 * @return {true/false}  Essa função retorna true ou false
 */
function errou() {
  tentativas++;
  if (tentativas >= 6) {
    return true;
  }
  return false;
}

/*
 * Adiciona uma classe a um element html.
 *
 * @example
 *   addClass("tecla","corCorta");
 *
 * @param {id}           Informe o id do elemento html
 * @param {classe}       Informe a classe que deseja inserir no element html
 * @return {undefined}  Essa função retorna undefined
 */
function addClass(id, classe) {
  const elemento = document.getElementById(id);
  const classes = elemento.className.split(" ");
  const getIndex = classes.indexOf(classe);

  if (getIndex === -1) {
    classes.push(classe);
    elemento.className = classes.join(" ");
  }
}

/*
 * Remove uma classe de um element html.
 *
 * @example
 *   delClass("tecla","corCorta");
 *
 * @param {id}           Informe o id do elemento html
 * @param {classe}       Informe a classe que deseja inserir no element html
 * @return {undefined}  Essa função retorna undefined
 */
function delClass(id, classe) {
  var elemento = document.getElementById(id);
  var classes = elemento.className.split(" ");
  var getIndex = classes.indexOf(classe);

  if (getIndex > -1) {
    classes.splice(getIndex, 1);
  }
  elemento.className = classes.join(" ");
}

function iniciarJogo() {
  if (gameOver) {
    addClass("win-lose", "ocultar");
  } else {
    addClass("splash", "ocultar");
  }
  ajustes();
  delClass("container", "ocultar");
  intervalID = window.setInterval(gameOverForca, 10);
}

function ajustes() {
  gameOver = false;
  tentativas = 0;
  rightletter = [];
  wrongletter = [];
  mensagem = "";
  categoria_dicas = sorteio("dicas");
  palavra = sorteio("palavra");
  secretWord = sorteio("secreta");
  tip = dicas[categoria_dicas];
  tipText.innerHTML = "Dica: " + tip;
  lenSecretWord = secretWord.length;
  tamLetrasErradas(lenSecretWord);
  limpezaCamposeBtns();
}

function sorteio(tipoSorteio) {
  switch (tipoSorteio) {
    case "dicas":
      return Math.floor(Math.random() * (categorias.length));
    // break;

    case "palavra":
      return Math.floor(
        Math.random() * (palavras[categorias[categoria_dicas]].length)
      );
    // break;

    case "secreta":
      return palavras[categorias[categoria_dicas]][palavra];
    // break;
  }
}

function tamLetrasErradas(tamSecretWord) {
  const eraseSpace = 9 - tamSecretWord;
  if (eraseSpace > 0) {
    for (let i = tamSecretWord + 1; i <= 9; i++) {
      addClass("cps" + i, "ocultar");
    }
  }
}

function limpezaCamposeBtns() {
  for (let i = 1; i <= 9; i++) {
    const posLetter = document.getElementById("cps" + i);
    posLetter.innerHTML = "";
    if (i <= 6) {
      const posLetter = document.getElementById("cpse" + i);
      posLetter.innerHTML = "";
    }
  }
  for (let i = 65; i <= 90; i++) {
    delClass(String(i), "corErrada");
    delClass(String(i), "corCerta");
  }
  // TODO: Melhorar essa código e colocar em uma função. Alterar do iníco também
  forcaPartsClean = document.getElementsByClassName("forca-parte");
  for (let i = 0; i < 6; i++){
    hangingPartClean = forcaPartsClean[i];
    hangingPartClean.style.display = "none";
  }
}
