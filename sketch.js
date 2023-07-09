// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis da raquete
let xRaquete = 7;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 100;

// variáveis do oponente
let xRaqueteOponente = 583;
let yRaqueteOponente = 150;
let direcaoRaqueteOponente = 1;

let colidiu = false;

// variáveis do placar
let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo
let ponto;
let raquetada;
let trilha;

function preload(){
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
  trilha = loadSound ("trilha.mp3");
}



function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete (xRaquete, yRaquete);
  mostraRaquete (xRaqueteOponente, yRaqueteOponente)
  movimentaMinhaRaquete ();
  //verificaColisaoRaquete();
  colisaoMinhaRaqueteBiblioteca (xRaquete, yRaquete);
  colisaoMinhaRaqueteBiblioteca (xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente ();
  mostraPlacar ();
  marcaPontos ();
  bolinhaNaoFicaPresa();
}

function mostraBolinha (){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
}

function verificaColisaoBorda (){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete (x, y){
  rect (x, y, larguraRaquete, alturaRaquete);
}

function movimentaMinhaRaquete (){
  if (keyIsDown (87) && yRaquete >= 0){
    yRaquete -= 10;
  }
  
  if (keyIsDown (83) && yRaquete <= (400 - alturaRaquete)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + larguraRaquete && yBolinha < yRaquete + alturaRaquete && yBolinha > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

function colisaoMinhaRaqueteBiblioteca (x, y){
  colidiu =
  collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente (){
  const mediaYBolinha = yBolinha + raio;
  const mediaYRaqueteOponente = yRaqueteOponente + (alturaRaquete/2);

  if (mediaYBolinha > mediaYRaqueteOponente) {
    direcaoRaqueteOponente = 1;
  } else {
    direcaoRaqueteOponente = -1;
  }
  yRaqueteOponente += 5 * random(0.6, 0.95) * direcaoRaqueteOponente;
}

function bolinhaNaoFicaPresa() {
    if (xBolinha - raio <= 0){
      xBolinha = 35;
    } else {
      if (xBolinha - raio >= 588){
        xBolinha = width - 35;
      }
    }
}

function mostraPlacar (){
  stroke (255);
  textAlign (CENTER);
  textSize (16);
  fill(color (255, 140, 0));
  rect (150, 10, 40, 20);
  fill (255);
  text (meusPontos, 170, 26);
  fill(color (255, 140, 0));
  rect (450, 10, 40, 20);
  fill (255);
  text (pontosOponente,470, 26 )
  
}

function marcaPontos (){
  if (xBolinha >590){
    meusPontos += 1;
    ponto.play();
  }
  
  if (xBolinha < 10){
    pontosOponente +=1;
    ponto.play();
  }
}