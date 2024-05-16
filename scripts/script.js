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

  // Esconder os controles do vídeo
  video.controls = false;

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
    health: 15,
    index: 0
  },
  {
    name: "Besta Raivosa",
    level: 8,
    health: 60,
    index: 1
  },
  {
    name: "Dragão",
    level: 9,
    health: 70,
    index: 2
  },
  { 
    name: "Esqueleto Maligno",
    level: 4,
    health: 20,
    index: 3
   },
   {
    name: "Elemental do Fogo",
    level: 9,
    health: 80,
    index: 4
   },
   {
    name: "Necromante Sombrio",
    level: 10,
    health: 90,
    index: 5
   },
   {
    name: "Hidra",
    level: 11,
    health: 100,
    index: 6
   },
   {
    name: "Bruxas Sombrias",
    level: 12,
    health: 110,
    index: 7
   },
   {
    name: "Lobisomen",
    level: 13,
    health: 120,
    index: 8
   },
   {
    name: "Górgon",
    level: 14,
    health: 130,
    index: 9
   },
   {
    name: "Azazel, O devorador de Almas",
    level: 20,
    health: 300,
    index: 10
   },

]
const locations = [
  {
    name: "town square",
    "button text": ["Ir para a loja", "Ir para a caverna", "Lutar com o Azazel"],
    "button functions": [goStore, goCave, fightAzazel],
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
    text: "Você está lutando contra um monstro.",
  },
  {
    name: "kill monster",
    "button text": ["Ir para a praça da cidade", "Ir para a praça da cidade", "Ir para a praça da cidade"],
    "button functions": [goTown, goTown, goTown],
    text: 'O monstro agoniza enquanto morre. Você ganha pontos de experiência e encontra ouro.'
  },
  {
    name: "lose",
    "button text": ["REINICIAR?", "REINICIAR?", "REINICIAR?"],
    "button functions": [restart, restart, restart],
    text: "Você morreu e teve seu corpo Desmembrado! ☠️"
  },
  { 
    name: "win", 
    "button text": ["REINICIAR?", "REINICIAR?", "REINICIAR?"], 
    "button functions": [restart, restart, restart], 
    text: "Você derrotou o Azazel! VOCÊ ZEROU O JOGO! 🎉"
  },
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightAzazel;

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

botaoListaMonstros = document.getElementById("openMonsterList");
document.getElementById("openMonsterList").addEventListener("click", function() {
  document.getElementById("monsterList").classList.toggle("hidden");
});


const monsterNamesContainer = document.getElementById("monsterNames");

monsters.forEach(monster => {
  const p = document.createElement("p");
  p.textContent = monster.name;
  p.addEventListener("click", function() {
      startFight(monster.index);
  });
  monsterNamesContainer.appendChild(p);
});

function startFight(monsterIndex) {
  // Implemente aqui a função para começar a luta com o monstro selecionado
  // Você pode chamar a função do seu jogo que inicia a luta com o monstro correspondente ao índice
  // Por exemplo, você pode chamar a função fightSlime() se o índice for 0
  document.getElementById("monsterList").classList.add("hidden");
  switch (monsterIndex) {
      case 0:
          fightSlime();
          break;
      case 1:
          fightBeast();
          break;
      case 2:
          fightDragon();
          break;
      case 3:
          fightSkeleton();
          break;
      case 4:
          fightFireElemental();
          break;
      case 5:
          fightNecromancer();
          break;
      case 6:
          fightHydra();
          break;
      case 7:
          fightDarkWitches();
          break;
      case 8:
          fightWerewolf();
          break;
      case 9:
          fightGorgon();
          break;
      default:
          break;
  }
}

function updateLocation(locationIndex, showSkeleton, showFireElemental) {
  const location = locations[locationIndex];
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];

  if (locationIndex === 2) {
    botaoListaMonstros.style.display = "inline";
  } else {
    botaoListaMonstros.style.display = "none";
  }

  text.innerText = location.text;
}

function hideMonsters() {
  const monsterImages = document.querySelectorAll('.monster');
  monsterImages.forEach(monster => {
    monster.style.display = "none";
    const azazel = document.getElementsByClass(".azazel");
    azazel.style.display = "none";
  });
}


function goTown() {
    background.style.background = "#ffffff";
    background.style.marginTop = "200px";
    if(verificacao == "slime" ) {
        monsterImage = document.querySelector(".monster1");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }
      if(verificacao == "fangedBeast" ) {
        monsterImage = document.querySelector(".monster2");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }
      if(verificacao == "dragao" ) {
        monsterImage = document.querySelector(".monster3");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }

      if(verificacao == "skeleton" ) {
        monsterImage = document.querySelector(".monster4");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }

      if(verificacao == "fireElemental" ) {
        monsterImage = document.querySelector(".monster5");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }

      if(verificacao == "necromancer" ) {
        monsterImage = document.querySelector(".monster6");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }

      if(verificacao == "hydra" ) {
        monsterImage = document.querySelector(".monster7");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }

      if(verificacao == "darkWitches" ) {
        monsterImage = document.querySelector(".monster8");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }

      if(verificacao == "werewolf" ) {
        monsterImage = document.querySelector(".monster9");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }

      if(verificacao == "gorgon" ) {
        monsterImage = document.querySelector(".monster10");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
      }

      if(verificacao == "azazel" ) {
        monsterImage = document.querySelector(".azazel");
        monsterImage.style.display = "none";
        statsText.style.color = "#0A0A23";
        text.style.color = "#fff";
        hideAzazel();
      }

      if(verificacao == 3 ) {
        statsText.style.color = "#fff";
        if(verificacao == "slime" || verificacao == 1 || verificacao == 2 || verificacao == 3 || verificacao == 4) {
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
      // Adiciona o botão de lutar contra Azazel apenas se o jogador já não estiver lutando contra ele
      if (verificacao != "azazel") {
      button3.style.display = "inline";
      button3.innerText = "Lutar contra Azazel";
      button3.onclick = fightAzazel;
      } else {
      button3.style.display = "none";
    }

  // Configurações padrão da vila
  verificacao = 5;
  MainTheme = document.getElementById('TownSquare');
  playMusic('TownSquare');
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  monsterImage = document.querySelector(".vila");
  monsterImage.style.display = "inline";
  botaoListaMonstros.style.display = "none";
  document.getElementById("monsterList").classList.add("hidden");
  update(locations[0]);
  hideAzazel();
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
  botaoListaMonstros.style.display = "none";
  verificacao = 4;
  const azazel = document.getElementsByClass(".azazel");
  azazel.style.display = "none";
  hideAzazel();
}

// Função para ocultar a cidade/vila
function hideVillage() {
  monsterImage = document.querySelector(".loja");
  monsterImage.style.display = "none";
}

function goCave() {
  playMusic('caveSound');
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  monsterImage = document.querySelector(".caverna");
  monsterImage.style.display = "inline";
  monsterImage = document.querySelector(".vila");
  monsterImage.style.display = "none";
  statsText.style.color = "#0A0A23";
  text.style.color = "#fff";
  verificacao = 3;

  // Verifica o nível de XP para determinar qual criatura mostrar na caverna
  if (xp >= 8) {
    updateLocation(2, false, true); // Elemental do Fogo desbloqueado
  } else if (xp >= 4) {
    updateLocation(2, true, false); // Esqueleto desbloqueado
  } else {
    updateLocation(2, false, false); // Nenhum desbloqueado
  }
  hideAzazel();
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
  verificacao = "slime";
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
  verificacao = "fangedBeast";
  monsterImage = document.querySelector(".monster2");
  monsterImage.style.display = "inline";
  playMusic('growlSound');
  playMusic('fangedBeastMusic');
}

// Função para lutar contra o esqueleto
function fightSkeleton() {
  fighting = 3; // Índice do esqueleto no array de monstros
  goFight();
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  verificacao = "skeleton"; // Atualiza a verificação para indicar que o jogador está lutando contra o esqueleto
  monsterImage = document.querySelector(".monster4");
  monsterImage.style.display = "inline";
  playMusic('skeletonMusic');
}

// Função para lutar contra o Elemental do Fogo
function fightFireElemental() {
  fighting = 4; // Índice do Elemental do Fogo no array de monstros
  goFight();
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  verificacao = "fireElemental"; // Atualiza a verificação para indicar que o jogador está lutando contra o Elemental do Fogo
  monsterImage = document.querySelector(".monster5");
  monsterImage.style.display = "inline";
  playMusic('fireCreatureSound');
}

function fightNecromancer() {
  fighting = 5; // Índice do Necromante Sombrio no array de monstros
  goFight();
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  verificacao = "necromancer"; // Atualiza a verificação para indicar que o jogador está lutando contra o Necromante Sombrio
  monsterImage = document.querySelector(".monster6");
  monsterImage.style.display = "inline";
  playMusic('necromancerMusic');
}

function fightHydra() {
  fighting = 6; // Índice da Hidra no array de monstros
  goFight();
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  verificacao = "hydra"; // Atualiza a verificação para indicar que o jogador está lutando contra a Hidra
  monsterImage = document.querySelector(".monster7");
  monsterImage.style.display = "inline";
  playMusic('hydraMusic');
  showWaterCave();
}

function fightDarkWitches() {
  fighting = 7; // Índice das Bruxas Sombrias no array de monstros
  goFight();
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  verificacao = "darkWitches"; // Atualiza a verificação para indicar que o jogador está lutando contra as Bruxas Sombrias
  monsterImage = document.querySelector(".monster8");
  monsterImage.style.display = "inline";
  playMusic('witchMusic');
}

function fightWerewolf() {
  fighting = 8; // Índice do Lobisomem no array de monstros
  goFight();
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  verificacao = "werewolf"; // Atualiza a verificação para indicar que o jogador está lutando contra o Lobisomem
  monsterImage = document.querySelector(".monster9");
  monsterImage.style.display = "inline";
  playMusic('werewolfMusic');
}

function fightGorgon() {
  fighting = 9; // Índice da Górgon no array de monstros
  goFight();
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  verificacao = "gorgon"; // Atualiza a verificação para indicar que o jogador está lutando contra a Górgon
  monsterImage = document.querySelector(".monster10");
  monsterImage.style.display = "inline";
  playMusic('gorgonMusic');
}

function fightAzazel() {
  // Configurações para lutar contra Azazel
  fighting = 10; // Índice de Azazel no array de monstros
  goFight(); // Função para iniciar a luta
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  monsterImage = document.querySelector(".azazel"); // Seletor da imagem de Azazel
  monsterImage.style.display = "inline";
  playMusic('azazelMusic');
  verificacao = "azazel"; // Atualiza a verificação para indicar que o jogador está lutando contra Azazel
  showFinalMap();
  };

function fightDragon() {
  fighting = 2;
  goFight();
  background.style.background = "#0A0A23";
  background.style.marginTop = "0px";
  verificacao = "dragao";
  monsterImage = document.querySelector(".monster3");
  monsterImage.style.display = "inline";
  playMusic('dragonMusic');
  monsterImage.style.zIndex = 1;
}

function hideAzazel() {
  // Oculta a imagem e a música de Azazel
  azazel = document.querySelector(".azazel");
  azazel.style.display = "none";
  const azazelMusic = document.getElementById('azazelMusic');
  if (azazelMusic) {
    azazelMusic.pause();
  }
  // Atualiza a verificação para indicar que o jogador não está mais lutando com Azazel
  verificacao = 0;
  azazel.style.zIndex = 0;
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
    hideAzazel();
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
  const monsterImage = document.querySelectorAll('[class^="monster"]');
  const azazel = document.getElementsByClass(".azazel");
  azazel.style.display = "none";
  statsText.style.color = "#0A0A23";
  playMusic('vitorySound');
  hideMonsters();
  hideAzazel();
}

function lose() {
  update(locations[5]);
  playMusic('loseSound');
  hideMonsters(); // Oculta apenas a imagem do monstro
  statsText.style.color = "#0A0A23";
  hideAzazel();
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
