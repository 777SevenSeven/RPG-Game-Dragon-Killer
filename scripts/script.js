let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["bastão"];
let monsterImage = document.querySelector(".monster1");
let statsText = document.getElementById("stats");
let background = document.getElementById("game");
let verificacao = 0;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");


let currentMusic = null;

//Scripts para a intro do jogo//
document.addEventListener("DOMContentLoaded", function() {
  var video = document.getElementById("intro-video");

  // Adicionar evento para redirecionar após o término do vídeo
  video.addEventListener("ended", function() {
      // Redirecionar para o index.html
      window.location.href = "menu.html";
  });
});

//pular intro
document.addEventListener("DOMContentLoaded", function() {
  var skipIntroBtn = document.getElementById("skip-intro");

  // Adicionar evento de clique para pular a introdução
  skipIntroBtn.addEventListener("click", function() {
      // Redirecionar para a página do menu inicial
      window.location.href = "menu.html"; 
  });
});

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//scripts para o menu do jogo//
document.addEventListener("DOMContentLoaded", function() {
  var menuContainer = document.querySelector(".menu-container");

// Adicionar evento de clique para pular a introdução
skipIntroBtn.addEventListener("click", function() {
  introContainer.style.display = "none";
  menuContainer.style.display = "block";
});
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function playMusic(musicId) {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }

    const newMusic = document.getElementById(musicId);
    newMusic.play();
    currentMusic = newMusic;
}


const weapons = [
  { name: 'Bastão', power: 5 },
  { name: 'Adaga', power: 30 },
  { name: 'Martelo De Espinhos', power: 50 },
  { name: 'Espada Lendária', power: 100 }
];
const monsters = [
  {
    name: "Gosma",
    level: 2,
    health: 15
  },
  {
    name: "Besta Raivosa",
    level: 8,
    health: 60
  },
  {
    name: "Dragão",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Ir para a loja", "Ir para a caverna", "Lutar com o Dragão"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'Você está na praça da cidade. Você vê um sinal que diz \"Loja\".'
  },
  {
    name: "store",
    "button text": ["Comprar 10 vida (10 ouro)", "Comprar arma (30 ouro)", "Ir na praça da cidade"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Você entra na loja."
  },
  {
    name: "cave",
    "button text": ["Lutar contra Gosma", "Lutar contra Besta Raivosa", "Ir para a praça da cidade"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Você entra na caverna. Você vê alguns monstros."
  },
  {
    name: "fight",
    "button text": ["Atacar", "Esquivar", "Fugir"],
    "button functions": [attack, dodge, goTown],
    text: "Você está lutando contra um monstro."
  },
  {
    name: "kill monster",
    "button text": ["Ir para a praça da cidade", "Ir para a praça da cidade", "Ir para a praça da cidade"],
    "button functions": [goTown, goTown, goTown],
    text: 'O monstro grita "Arg!" enquanto morre. Você ganha pontos de experiência e encontra ouro.'
  },
  {
    name: "lose",
    "button text": ["REINICIAR?", "REINICIAR?", "REINICIAR?"],
    "button functions": [restart, restart, restart],
    text: "Você morreu e foi devorado. ☠️"
  },
  { 
    name: "win", 
    "button text": ["REINICIAR?", "REINICIAR?", "REINICIAR?"], 
    "button functions": [restart, restart, restart], 
    text: "Você derrotou o dragão! VOCÊ ZEROU O JOGO! 🎉"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Ir para a praça da cidade?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Você encontra um jogo secreto. Escolha um número acima. Dez números serão escolhidos aleatoriamente entre 0 e 10. Se o número que você escolher corresponder a um dos números aleatórios, você vence!"
  }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
    background.style.background = "#ffffff";
    background.style.marginTop = "200px";
    if(verificacao == 0 ) {
        monsterImage = document.querySelector(".monster1");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }
      if(verificacao == 1 ) {
        monsterImage = document.querySelector(".monster2");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }
      if(verificacao == 2 ) {
        monsterImage = document.querySelector(".monster3");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }

      if(verificacao == 3 ) {
        statsText.style.color = "#fff";
        if(verificacao == 0 || verificacao == 1 || verificacao == 2 || verificacao == 3) {
        monsterImage = document.querySelector(".caverna");
        monsterImage.style.display = "none";
        statsText.style.color = "#fff";
      }
    } else {
        monsterImage = document.querySelector(".caverna");
        monsterImage.style.display = "none";
        statsText.style.color = "#fff";
      }

      if(verificacao == 4) {
        hideVillage();
      }
      
      verificacao = 5;
      MainTheme = document.getElementById('TownSquare');
      playMusic('TownSquare');
      background.style.background = "#0A0A23";
      background.style.marginTop = "0px";
      monsterImage = document.querySelector(".vila");
      monsterImage.style.display = "inline";
  update(locations[0]);
}

function goStore() {
  playMusic('StoreSound');
  update(locations[1]);

  // Oculta a cidade/vila e exibe a loja
  monsterImage = document.querySelector(".vila");
  monsterImage.style.display = "none";
  
  monsterImage = document.querySelector(".loja");
  if (verificacao == 5) {
      monsterImage = document.querySelector(".loja");
  }
  monsterImage.style.display = "inline";
  
  verificacao = 4;
}

// Função para ocultar a cidade/vila
function hideVillage() {
  monsterImage = document.querySelector(".loja");
  monsterImage.style.display = "none";
}

function goCave() {
  playMusic('caveSound');
  update(locations[2]);
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  monsterImage = document.querySelector(".caverna");
  monsterImage.style.display = "inline";
  monsterImage = document.querySelector(".vila");
  monsterImage.style.display = "none";
  statsText.style.color = "#0A0A23";
  text.style.color = "#fff";
  verificacao = 3;
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Você não tem ouro o suficiente para comprar vida.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Agora você está empunhando:" + " " + newWeapon + "." + " ";
      inventory.push(newWeapon);
      text.innerText += "  " + "Em seu inventário você tem: " + " " + inventory;
    } else {
      text.innerText = "Você não tem ouro o suficiente para comprar uma arma.";
    }
  } else {
    text.innerText = "Você já tem a arma mais forte!";
    button2.style.backgroundColor="red";
    button2.innerText = "Vender arma por 15 ouro";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Você vendeu uma arma chamada: " + currentWeapon + ".";
    text.innerText += " No seu inventário você tem: " + inventory;
  } else {
    text.innerText = "Não venda sua única arma!";
    text.style.color="red";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
  background.style.background = "#0A0A23";
  verificacao = 0;
  background.style.marginTop = "0px";
  monsterImage = document.querySelector(".monster1");
  monsterImage.style.display = "inline";
  playMusic('slimeSound');
  playMusic('slimeMusic');
}

function fightBeast() {
  fighting = 1;
  goFight();
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  verificacao = 1;
  monsterImage = document.querySelector(".monster2");
  monsterImage.style.display = "inline";
  playMusic('growlSound');
  playMusic('fangedBeastMusic');
}

function fightDragon() {
  fighting = 2;
  goFight();
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  verificacao = 2;
  monsterImage = document.querySelector(".monster3");
  monsterImage.style.display = "inline";
  playMusic('dragonSound');
  playMusic('dragonMusic');
  monsterImage.style.zIndex = 1;
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  statsText.style.color = "#ffffff";
}

function attack() {
  text.innerText = "O " + monsters[fighting].name + " ataca.";
  text.innerText += " Você ataca com  " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);

  monsterImage.classList.add('attacked');
    setTimeout(() => {
        monsterImage.classList.remove('attacked');
    }, 500); 

  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Você errou.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Seu " + inventory.pop() + " quebrou.";
    text.style.color="red";
    text.style.fontWeight="bold";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Você esquiva do ataque do " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);

  if(verificacao == 0 ) {
    monsterImage = document.querySelector(".monster1");
    monsterImage.style.display = "none";
    statsText.style.color = "#0A0A23";
    playMusic('vitorySound');  
  }
  if(verificacao == 1 ) {
    monsterImage = document.querySelector(".monster2");
    monsterImage.style.display = "none";
    statsText.style.color = "#0A0A23";
    playMusic('vitorySound');  
  }
  if(verificacao == 2 ) {
    monsterImage = document.querySelector(".monster3");
    monsterImage.style.display = "none";
    statsText.style.color = "#0A0A23";
    playMusic('vitorySound');  
  }
}

function lose() {
  update(locations[5]);
  playMusic('loseSound');
  if(verificacao == 0 ) {
    monsterImage = document.querySelector(".monster1");
    monsterImage.style.display = "none";
    statsText.style.color = "#0A0A23";
  }
  if(verificacao == 1 ) {
    monsterImage = document.querySelector(".monster2");
    monsterImage.style.display = "none";
    statsText.style.color = "#0A0A23";
  }
  if(verificacao == 2 ) {
    monsterImage = document.querySelector(".monster3");
    monsterImage.style.display = "none";
    statsText.style.color = "#0A0A23";
  }
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["bastão"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  background.style.marginTop = "200px";
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Você escolheu " + palpite + ". Aqui estão os números aleatórios:\n";
  for (let i = 0; i < 10; i++) {
      text.innerText += números[i] + "\n";
  }
  if (números.indexOf(palpite) !== -1) {
      text.innerText += "Certo! Você ganha 20 de ouro!";
      gold += 20;
      goldText.innerText = gold;
  } else {
      text.innerText += "Errado! Você perde 10 de vida!";
      health -= 10;
      healthText.innerText = health;
      if (health <= 0) {
          perder();
      }
  }
}
