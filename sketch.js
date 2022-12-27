//Variáveis dos objetos
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 20;
let raioBolinha = diametroBolinha /3

let xRaquete = 10;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

let xRaqueteOponente = 580;
let yRaqueteOponente = 150;

let colidiu = false;


//Variáveis de velocidade
let velocidadeBolinhaEmX = 6;
let velocidadeBolinhaEmY = 6;
let velocidadeRaqueteEmY = 12;
let velocidadeRaqueteOponenteEmY = 8;

//variáveis do placar
let meusPontos = 0;
let pontosOponente = 0;

//Variáveis de sons
let trilhaSonora;
let somRaquetada;
let somPonto;



function preload(){
  trilhaSonora = loadSound("trilha.mp3");
  somRaquetada = loadSound("raquetada.mp3");
  somPonto = loadSound("ponto.mp3");
}

function marcarPontos(){
  if (xBolinha - raioBolinha < 10){
    pontosOponente += 1;
    somPonto.play();
    xBolinha = 25; 
    velocidadeBolinhaEmX *= -1;
  }
  if (xBolinha - raioBolinha> 585){
    meusPontos += 1;
    somPonto.play();
    xBolinha = 570
    
   
  }
  
}


function criarPlacar(){
  stroke(255)
  fill (color(255,140,0)); 
  rect (430,10, 40,20);
  rect (130,10,40,20);
  
  stroke(0)
  textAlign(CENTER);
  fill (255);
  textSize(16);
  text (meusPontos,150,26);
  text (pontosOponente, 450, 26);
}


function moverRaqueteOponente(){
 if (keyIsDown(UP_ARROW)){
    yRaqueteOponente -= velocidadeRaqueteEmY;
  } 
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteOponente += velocidadeRaqueteEmY;
  } 
}

function verificarColisaoRaqueteBolinha(x,y){
  colidiu = collideRectCircle(x,y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha,raioBolinha);
  if (colidiu){
   
    velocidadeBolinhaEmX *= -1;
    somRaquetada.play();
  }
}

/*
//FUNÇÃO CRIADA PELO PROFESSOR, NÃO UTILIZADA (UTILIZAMOS DA BIBLIOTECA O P5 COLLIDE_2D)
//function verificarColisaoMinhaRaquete(){
//if (xBolinha - raioBolinha < xRaquete + comprimentoRaquete
   //posição x da bolinha - 2 < posição x da Raquete + comp. da //Raquete
//    && yBolinha - raioBolinha < yRaquete + alturaRaquete && //yBolinha + raioBolinha > yRaquete){
//  velocidadeBolinhaEmX *= -1;
//}  
//}
*/

function moverMinhaRaquete(){
  if (keyIsDown(87)){
    yRaquete -= velocidadeRaqueteEmY;
  } 
  if (keyIsDown(83)){
    yRaquete += velocidadeRaqueteEmY;
  } 
}

function mostrarRaquete(x,y){
  rect(x,y,comprimentoRaquete,alturaRaquete)
}


function mostrarBolinha(){
  circle (xBolinha,yBolinha,diametroBolinha);
}

function moverBolinha(){
  xBolinha += velocidadeBolinhaEmX;
  yBolinha += velocidadeBolinhaEmY;
}

function verificaColisaoBolinha(){
  
  if (xBolinha + raioBolinha > width || xBolinha - raioBolinha < 0){
    velocidadeBolinhaEmX *= -1    
  }
  if (yBolinha + raioBolinha > height || yBolinha -raioBolinha < 0){
    velocidadeBolinhaEmY *= -1
  }
}

function setup() {
  createCanvas(600, 400);
  trilhaSonora.loop()
  
}

function draw() {
  background(20);
  mostrarBolinha();
  moverBolinha();
  verificaColisaoBolinha();
  mostrarRaquete(xRaquete,yRaquete);
  moverMinhaRaquete();
  //verificarColisaoMinhaRaquete();
  verificarColisaoRaqueteBolinha(xRaquete,yRaquete)
  mostrarRaquete(xRaqueteOponente,yRaqueteOponente);
  moverRaqueteOponente();
 
  verificarColisaoRaqueteBolinha(xRaqueteOponente,yRaqueteOponente)
  criarPlacar();
  marcarPontos();
}