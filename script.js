const front = document.querySelector(".container-side.front");
const back = document.querySelector(".container-side.back");
const imgBot = document.querySelector(".img-bot");
const info = document.querySelector(".info");
const score = document.querySelectorAll(".score");
const choice = document.querySelectorAll("li img");
const scorePlayer = document.querySelector("#score-player");
const scoreBot = document.querySelector("#score-bot");
const title = document.querySelector(".title");
let valuePlayer = scorePlayer.getAttribute('value');
let valueBot = scoreBot.getAttribute('value');

function pilBot() {
  const bot = Math.random();
  if (bot < 0.33) return "gajah";
  if (bot >= 0.33 && bot < 0.66) return "orang";
  return "semut";
}

function getResult(bot, player) {
  if (player === bot) return "SERI";
  if (player === "gajah") return bot === "orang" ? "MENANG" : "KALAH";
  if (player === "orang") return bot === "semut" ? "MENANG" : "KALAH";
  if (player === "semut") return bot === "gajah" ? "MENANG" : "KALAH";
}

function acakGambarBot() {
  const gambar = ["gajah", "orang", "semut"];
  let i = 0;
  const timeIn = new Date().getTime(); // untuk mendapatkan waktu saat itu
  setInterval(() => {
    if (new Date().getTime() - timeIn > 1000) {
      clearInterval;
      return;
    }
    imgBot.setAttribute("src", "img/" + gambar[i++] + ".png");
    if (i === gambar.length) i = 0;
  }, 100);
}

function flipContainer(hasil) {
  front.style.transform = 'rotateY(180deg)';
  back.style.transform = 'rotateY(0deg)';
  if (hasil === 'Menang') {
    const endResult = document.querySelector('.end-result');
    endResult.innerHTML = 'You Win!';
    back.style.backgroundImage = 'linear-gradient(315deg, #2a5bc7 0%, #90b2fc 74%)';
  } else if (hasil === 'Kalah') {
    const endResult = document.querySelector('.end-result');
    endResult.innerHTML = 'You Lose!';
    back.style.backgroundImage = 'linear-gradient(315deg, #fc5296 0%, #f67062 74%)';
  }
}

choice.forEach((pil) => {
  pil.addEventListener("click", () => {
    if (valuePlayer < 5 && valueBot < 5) {   
      const pilihanBot = pilBot();
      const pilihanPlayer = pil.className;
      const hasil = getResult(pilihanBot, pilihanPlayer);
      // acak gambar bot
      acakGambarBot();
      
      setTimeout(() => {
        // change img bot
        imgBot.setAttribute("src", "img/" + pilihanBot + ".png");
        // tulis hasil di info
        info.innerHTML = hasil;
        // menjalankan fungsi scoring
        if (hasil === 'MENANG') {
          valuePlayer++;
          if (valuePlayer === 5) {
            flipContainer('Menang');
            title.innerHTML = 'Congratulation!'
          }
          scorePlayer.innerHTML = valuePlayer;
          scorePlayer.setAttribute('value', valuePlayer);
          valuePlayer = scorePlayer.getAttribute('value');
          
        } else if (hasil === 'KALAH') {
          valueBot++;
          if (valueBot === 5) {
            flipContainer('Kalah');
            title.innerHTML = 'Awoakwokawk';
          }
          scoreBot.innerHTML = valueBot;
          scoreBot.setAttribute('value', valueBot);
          valueBot = scoreBot.getAttribute('value');
        }
      }, 1000);
    }     
  });
});

