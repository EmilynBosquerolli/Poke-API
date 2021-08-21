// API endpoint --------------------------------------------
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// * Main api handler
function fetch_api(i) {
  const api = `https://pokeapi.co/api/v2/pokemon/${i}/`;
  const promise = fetch(api);
  return promise.then((response) => {
    return response.json();
  });
}

// Get Elements --------------------------------------------
const searchInput = getElement('.search-input'),
  searchButton = getElement('.search-button'),
  container = getElement('.pokemon'),
  erroMessage = getElement('.error');

const cards = [];
const maoJogador = [];
const maoBot = [];
const jogadorDeck = [];
const botDeck = [];

function Card(json) {
  this.img = json.sprites.other["official-artwork"].front_default;
  this.name = json.name;
  this.hp = json.stats[0].base_stat;
  this.attack = json.stats[1].base_stat;
  this.defense = json.stats[2].base_stat;
  this["special-attack"] = json.stats[3].base_stat;
  this["special-defense"] = json.stats[4].base_stat;
  this.speed = json.stats[5].base_stat;
}

// Build Functions --------------------------------------------
// Função que faz a chamada das principais funções e inicia o app
function startApp() {
  //Cria os dois decks, máquina e jogador 
  randomDeck(jogadorDeck);
  randomDeck(botDeck);
  generatePokemonsHTML(jogadorDeck, true);
  generatePokemonsHTML(botDeck, false);
    for(let i=0; i < 5; i++){
     maoJogador[i] = jogadorDeck[i];
     maoBot[i] = botDeck[i];
    }
  console.log("Deck Jogador");
  console.log(jogadorDeck);
  console.log("Deck Bot");
  console.log(botDeck);
  console.log("Mao Jogador");
  console.log(maoJogador);
  console.log("Mao bot");
  console.log(maoBot);
}



//Função para definir o turno dos jogadores
function defineTurno(maoJogador) {
  if (maoJogador) {
    //attributeChange(maoBot, maoJogador.Card);
    //checkAttribute(Card(maoJogador), Card(cpu), atributo);
  } else {
    let cpu = attributeCompare(maoBot);
  }
}

// Função que compara a o atributo da carta selecionada pelo jogador com as cartas da cpu
function attributeChange(maoBot, maoJogador) {
  let valueBestAttribute = maoBot;

  for (let i = 1; i <= 5; i++) {
    let bestAttributePlayer = maoJogador[i].Card;
    if (maoBot[i].Card > bestAttributePlayer) {
      valueBestAttribute = maoBot[i].Card;
    }
  }
  return valueBestAttribute;
}

//Função pra checar os atributos com valores mais altos 
function attributeCompare(maoBot) {
  for (let i = 1; i <= 5; i++) {
    let bestAttributeBot = "attack";
    let valueBestAttribute = maoBot[i].attack;

    if (maoBot[i].defense > valueBestAttribute) {
      bestAttributeBot = "defense";
      valueBestAttribute = maoBot[i].defense;
    }
    if (maoBot[[i]["special-attack"]] > valueBestAttribute) {
      bestAttributeBot = "special-attack";
    }
    if (maoBot[[i]["special-defense"]] > valueBestAttribute) {
      bestAttributeBot = "special-defense";
    }
    if (maoBot[i].speed > valueBestAttribute) {
      bestAttributeBot = "speed";
    }
    if (maoBot[i].hp > valueBestAttribute) {
      bestAttributeBot = "hp";
    }
  }
  return bestAttributeBot;
}

// Função que conta as cartas e define a maior, coloca e retira dos montes e conta os pontos
function pushPopDecks(playerCard, computerCard, attribute) {
  attributeCompare(attribute);
  if (playerCard[attribute] > computerCard[attribute]) {
    jogadorDeck.push(jogadorDeck.shift());
    jogadorDeck.push(botDeck.shift());
  } else if (playerCard[attribute] == computerCard[attribute]) {
    jogadorDeck.push(jogadorDeck.shift());
    botDeck.push(botDeck.shift());
  } else {
    botDeck.push(botDeck.shift());
    botDeck.push(jogadorDeck.shift());
  }
  endRound();
}

// Função que termina o round 
function endRound() {

  //adicionar um if aqui 
  endGame();
}

//Função que encerra o jogo 
function endGame() {
  if (playerDeck.length) {
    alert("VOCÊ VENCEU!");
  } else {
    alert("VOCÊ PERDEU!");
  }
}

//Função pra criar o deck, gera randomicamente os 32 pokemons
function randomDeck(deck) {
  let qtdCartas = 32;
  let cardNumber = 0;

  while (qtdCartas) {
    cardNumber = Math.floor(Math.random() * 500);
    deck.push(cardNumber);
    qtdCartas--;
  }
  return deck;
}

// Função para reduzir a escrita na captura de elementos HTML
function getElement(element) {
  return document.querySelector(element);
}


function printCard(data) {
  //Cria a div que adiciona os elementos
  const card = document.createElement("div");
  card.classList.add("card");
  //Adiciona a imagem
  const img = document.createElement("img");
  img.src = data.sprites.other["official-artwork"].front_default;
  //Adiciona o nome
  const pokemon_name = document.createElement("H3");
  pokemon_name.innerText = data.name;

  //Adiciona as habilidades
  const pokemon_hp = document.createElement("p");
  pokemon_hp.innerText = "HP: " + data.stats.filter(stats => stats.stat.name == "hp").map(stats => { return stats.base_stat; })[0];
  const pokemon_attack = document.createElement("p");
  pokemon_attack.innerText = "Attack: " + data.stats.filter(stats => stats.stat.name == "attack").map(stats => { return stats.base_stat; })[0];
  const pokemon_defense = document.createElement("p");
  pokemon_defense.innerText = "Defense: " + data.stats.filter(stats => stats.stat.name == "defense").map(stats => { return stats.base_stat; })[0];
  const pokemon_special_attack = document.createElement("p");
  pokemon_special_attack.innerText = "S.attack: " + data.stats.filter(stats => stats.stat.name == "special-attack").map(stats => { return stats.base_stat; })[0];
  const pokemon_special_defense = document.createElement("p");
  pokemon_special_defense.innerText = "S.defense: " + data.stats.filter(stats => stats.stat.name == "special-defense").map(stats => { return stats.base_stat; })[0];
  const pokemon_speed = document.createElement("p");
  pokemon_speed.innerText = "Speed: " + data.stats.filter(stats => stats.stat.name == "speed").map(stats => { return stats.base_stat; })[0];

  //Adiciona todos os elementos no card
  card.appendChild(img);
  card.appendChild(pokemon_name);
  card.appendChild(pokemon_hp);
  card.appendChild(pokemon_attack);
  card.appendChild(pokemon_defense);
  card.appendChild(pokemon_special_attack);
  card.appendChild(pokemon_special_defense);
  card.appendChild(pokemon_speed);

  //Adiciona a carta na página principal
  const main = document.querySelector(".main");
  main.appendChild(card);
}
// * Generate pokemon cards funtion
// Função responsavel por montar o HTML exibido na pagina
//Imagem do pokemon, nome do pokemon, habilidades (HP, ataque, defesa, ataque especial, defesa especial, velocidade).
async function generatePokemonsHTML(deck, print) {
  for (let i = 1; i <= 5; i++) {
    let pokemon_card = await fetch_api(deck[i]);
    const data = pokemon_card;
    const cardObj = new Card(data);
    cards[deck[i]] = cardObj;
    maoJogador[i] = deck[i];
    if (print) {
      printCard(data);
    }
  }
}

// Add Events --------------------------------------------
searchButton.addEventListener('click', event => {
  event.preventDefault();
  pokeIndice = searchInput.value;
  defineTurno(cards[maoJogador[pokeIndice]]);
  attributeCompare(cards[maoBot]);
});

startApp();
