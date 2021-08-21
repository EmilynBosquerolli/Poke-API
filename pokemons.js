// API endpoint --------------------------------------------
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Get Elements --------------------------------------------
const searchInput = getElement('.search-input'),
  searchButton = getElement('.search-button'),
  container = getElement('.pokemon'),
  erroMessage = getElement('.error');

var
  pokemon, // Responsavel por guardar os dados recebidos da API
  card; // Responsavel por receber o HTML 
let jogadorDeck;
let computerDeck;
const cards = [];
const maoPlayer = [];
const maoCpu = [];

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
  jogadorDeck = [];
  computerDeck = [];
  //Cria os dois decks, máquina e jogador 
  randomDeck(jogadorDeck);
  randomDeck(computerDeck);
  generatePokemonsHTML(jogadorDeck, true);
  generatePokemonsHTML(computerDeck, false);
}

//Função para definir o turno dos jogadores
function defineTurno(maoPlayer) {
  if (maoPlayer) {
    //attributeChange(maoCpu, maoPlayer.Card);
    //checkAttribute(Card(maoPlayer), Card(cpu), atributo);
  } else {
    let cpu = attributeCompare(maoCpu);
  }
}

// Função que compara a o atributo da carta selecionada pelo jogador com as cartas da cpu
function attributeChange(maoCpu, maoPlayer) {
  let valueBestAttribute = maoCPU;

  for (let i = 1; i <= 5; i++) {
    let bestAttributePlayer = maoPlayer[i].Card;
    if (maoCpu[i].Card > bestAttributePlayer) {
      valueBestAttribute = maoCpu[i].Card;
    }
  }
  return valueBestAttribute;
}

//Função pra checar os atributos com valores mais altos 
function attributeCompare(maoCPU) {
  for (let i = 1; i <= 5; i++) {
    let bestAttributeBot = "attack";
    let valueBestAttribute = maoCPU[i].attack;

    if (maoCPU[i].defense > valueBestAttribute) {
      bestAttributeBot = "defense";
      valueBestAttribute = maoCPU[i].defense;
    }
    if (maoCPU[[i]["special-attack"]] > valueBestAttribute) {
      bestAttributeBot = "special-attack";
    }
    if (maoCPU[[i]["special-defense"]] > valueBestAttribute) {
      bestAttributeBot = "special-defense";
    }
    if (maoCPU[i].speed > valueBestAttribute) {
      bestAttributeBot = "speed";
    }
    if (maoCPU[i].hp > valueBestAttribute) {
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
    jogadorDeck.push(computerDeck.shift());
  } else if (playerCard[attribute] == computerCard[attribute]) {
    jogadorDeck.push(jogadorDeck.shift());
    computerDeck.push(computerDeck.shift());
  } else {
    computerDeck.push(computerDeck.shift());
    computerDeck.push(jogadorDeck.shift());
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

// * Main api handler
function fetch_api(i) {
  const api = `https://pokeapi.co/api/v2/pokemon/${i}/`;
  const promise = fetch(api);
  return promise.then((response) => {
    return response.json();
  });
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
    maoPlayer[i] = deck[i];
    if (print) {
      printCard(data);
    }
  }
}

// Add Events --------------------------------------------
searchButton.addEventListener('click', event => {
  event.preventDefault();
  pokeIndice = searchInput.value;
  defineTurno(cards[maoPlayer[pokeIndice]]);
  attributeCompare(cards[maoCPU]);
});

startApp();