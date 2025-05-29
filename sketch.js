let coqueiro1;
let coqueiro2;
let cocosCaindo = [];
let gravidade = 0.5;
let chuva = [];
let bolaVolei;

function setup() {
  createCanvas(400, 300);
  coqueiro1 = new Coqueiro(100, height * 0.7 - 50);
  coqueiro2 = new Coqueiro(300, height * 0.7 - 80);

  // Inicializa a chuva
  for (let i = 0; i < 100; i++) {
    chuva.push(new GotaChuva(random(width), random(height / 2)));
  }

  // Inicializa a bola de vôlei
  bolaVolei = new BolaVolei(width / 2, height * 0.7 + 20);
}

function draw() {
  // Desenha o arco-íris no fundo
  drawRainbow();

  // Céu azul (ligeiramente sobreposto ao arco-íris)
  fill(135, 206, 235, 200);
  rect(0, 0, width, height * 0.7);

  // Areia amarela
  fill(244, 164, 96);
  rect(0, height * 0.7, width, height * 0.3);

  // Desenha a rede de vôlei
  drawVolleyballNet();

  // Desenha os coqueiros
  coqueiro1.draw();
  coqueiro2.draw();

  // Atualiza e desenha os cocos caindo
  for (let i = cocosCaindo.length - 1; i >= 0; i--) {
    cocosCaindo[i].atualizar();
    cocosCaindo[i].desenhar();
    if (cocosCaindo[i].y > height * 0.7 + cocosCaindo[i].diametro / 2) {
      cocosCaindo.splice(i, 1);
    }
  }

  // Atualiza e desenha a chuva
  for (let gota of chuva) {
    gota.atualizar();
    gota.desenhar();
  }

  // Desenha a bola de vôlei
  bolaVolei.desenhar();

  // Sol amarelo
  fill(255, 255, 0);
  ellipse(50, 50, 50, 50);
}

function drawRainbow() {
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = 150;
  let numColors = 7;
  let rainbowColors = [
    color(255, 0, 0),
    color(255, 165, 0),
    color(255, 255, 0),
    color(0, 255, 0),
    color(0, 0, 255),
    color(75, 0, 130),
    color(238, 130, 238)
  ];

  noFill();
  strokeWeight(20);
  for (let i = 0; i < numColors; i++) {
    stroke(rainbowColors[i]);
    arc(centerX, centerY, radius - i * 20, radius - i * 20, PI, 0);
  }
  strokeWeight(1);
}

function drawVolleyballNet() {
  stroke(0);
  strokeWeight(2);
  let netTop = height * 0.7 - 40;
  let netBottom = height * 0.7;
  let netLeft = width * 0.4;
  let netRight = width * 0.6;
  line(netLeft, netTop, netLeft, netBottom);
  line(netRight, netTop, netRight, netBottom);
  line(netLeft, netTop, netRight, netTop);
  line(netLeft, netBottom, netRight, netBottom);
  for (let i = netLeft; i <= netRight; i += 10) {
    line(i, netTop, i, netBottom);
  }
  for (let i = netTop; i <= netBottom; i += 10) {
    line(netLeft, i, netRight, i);
  }
  strokeWeight(1);
}

class Coqueiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    noStroke();
    fill(139, 69, 19);
    rect(this.x - 10, this.y - 50, 20, 100);
    fill(0, 128, 0);
    ellipse(this.x, this.y - 80, 60, 50);
    ellipse(this.x - 20, this.y - 75, 50, 40);
    ellipse(this.x + 20, this.y - 75, 50, 40);
    fill(101, 67, 33);
    ellipse(this.x - 15, this.y - 100, 15, 15);
    ellipse(this.x + 15, this.y - 95, 15, 15);
    ellipse(this.x + 5, this.y - 70, 15, 15);
    ellipse(this.x - 25, this.y - 85, 12, 12);
    ellipse(this.x + 25, this.y - 105, 10, 10);
    ellipse(this.x, this.y - 60, 18, 18);
    ellipse(this.x - 30, this.y - 65, 14, 14);
    ellipse(this.x + 30, this.y - 80, 16, 16);
  }
}

class CocoCaindo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diametro = 15;
    this.velocidadeY = 0;
  }

  atualizar() {
    this.velocidadeY += gravidade;
    this.y += this.velocidadeY;
  }

  desenhar() {
    fill(101, 67, 33);
    ellipse(this.x, this.y, this.diametro, this.diametro);
  }
}

class GotaChuva {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.comprimento = random(10, 20);
    this.velocidadeY = random(5, 10);
  }

  atualizar() {
    this.y += this.velocidadeY;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  desenhar() {
    stroke(0, 0, 255);
    line(this.x, this.y, this.x, this.y + this.comprimento);
  }
}

class BolaVolei {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diametro = 25;
  }

  desenhar() {
    fill(255); // Cor branca da bola
    stroke(0); // Contorno preto
    ellipse(this.x, this.y, this.diametro, this.diametro);
    noFill();
    // Desenha as linhas da bola de vôlei (simplificado)
    arc(this.x, this.y, this.diametro, this.diametro, 0, PI);
    arc(this.x, this.y, this.diametro, this.diametro, PI / 2, PI + PI / 2);
  }
}