const keyboard = document.getElementById("teclado");
const tipText = document.getElementById("tips");

keyboard.addEventListener("click", keyPressOrclick);
document.addEventListener("keydown", keyPressOrclick);

let gameOver = false;
let tentativas = 0;
const rightletter = [];
const wrongletter = [];

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
  "MEIOS DE TRANSPORTES"
];
const dicas = [
  "Cidades do litorial Sul de São Paulo",
  "Linguagens de programação antigas",
  "Animais quadrupedes domesticados",
  "Ossos que foram a caixa craniana",
  "Profissãos Perigosas e Insalubres",
  "As maiores vendedoras de celular no Brasil",
  "Frutas da região Nordeste do Brasil",
  "Clima e Tempo",
  "Meios de Transportes",
];
const palavras = {
  CIDADES: [
    "SANTOS", 
    "PERUIBE", 
    "MONGAGUA", 
    "ITANHAEM",
  ],
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
  ANIMAIS: [
    "CACHORRO", 
    "GATO", 
    "CAVALO", 
    "OVELHA", 
    "PORCO",
  ],
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

const categoria_dicas = Math.floor(Math.random() * (categorias.length + 1));
const palavra = Math.floor(
  Math.random() * (palavras[categorias[categoria_dicas]].length + 1)
);

const secretWord = palavras[categorias[categoria_dicas]][palavra];
const tip = dicas[categoria_dicas];

tipText.innerHTML = "Dica: " + tip;

const lenSecretWord = secretWord.length;

const eraseSpace = 9 - lenSecretWord;
if (eraseSpace > 0) {
  for (let i = lenSecretWord + 1; i <= 9; i++) {
    addClass("cps" + i, "ocultar");
  }
}

let intervalID = window.setInterval(gameOverForca, 10);

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
        addClass(keyPressClick,"corCerta");
        gameOver = acertou(secretWord, rightletter);
      }
    } else {
      // Verifica se a letra errada esta inclusa na relação de palabras erradas.
      // Caso já esteja, não adiciona novamente a mesma letra.
      if (!wrongletter.includes(letra)) {
        // Caso a letra não esteja na lista de palavras erradas,
        // a mesma é adicionada.
        gameOver = errou(tentativas);
        showWrongWord(letra);
        addClass(keyPressClick,"corErrada");
        wrongletter.push(letra);
      }
    }
  }
  // gameOverForca();
}

// Retorna verdadeiro se o caracter pressionado é
// um código entre a letra A e a letra Z.
function isCaracter(keyCaracter) {
  return keyCaracter >= 65 && keyCaracter <= 90;
}

function showRightWord(array, letter) {
  array = array.split("");
  array.forEach(function (element, index, array) {
    if (element === letter) {
      const posLetter = document.getElementById("cps" + (index + 1));
      posLetter.innerHTML = letter;
    }
  });
}

function showWrongWord(letter) {
  const posLetter = document.getElementById("cpse" + tentativas);
  posLetter.innerHTML = letter;
}

function gameOverForca() {
  if (gameOver && tentativas < 6) {
    alert("Jogo Acabou! Você ganhou!");
    clearInterval(intervalID);
    location.reload();
  } else if (gameOver && tentativas >= 6) {
    alert(`Jogo Acabou! Você perdeu!\nA palavra secreta é: ${secretWord}`);
    clearInterval(intervalID);
    location.reload();
  }
}

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

function errou() {
  tentativas++;
  if (tentativas >= 6) {
    return true;
  }
  return false;
}

function addClass(id, classe) {
  const elemento = document.getElementById(id);
  const classes = elemento.className.split(" ");
  const getIndex = classes.indexOf(classe);

  if (getIndex === -1) {
    classes.push(classe);
    elemento.className = classes.join(" ");
  }
}

function delClass(id, classe) {
  var elemento = document.getElementById(id);
  var classes = elemento.className.split(" ");
  var getIndex = classes.indexOf(classe);

  if (getIndex > -1) {
    classes.splice(getIndex, 1);
  }
  elemento.className = classes.join(" ");
}
