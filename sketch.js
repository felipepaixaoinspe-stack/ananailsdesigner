// App Manicure PRO - OpenProcessing (p5.js)

let offsetX;
let larguraApp;
let escala;
let clientes = [];
let nomeInput, valorSelect, pagoCheckbox;
let botaoAdicionar;
let meta = 2000;
let buscaInput;
let fotoDona;
let tempoClique = 0;
let scrollY = 0;
let scrollRelatorio = 0;
let scrollClientes = 0;
let scrollAgenda = 0;
let buscaFocada = false;
let mesSelecionado = null;
let metasPorMes = {};
let scrollTexto = 0;
let piscar = 0;
let animPassaro = 0;
let iconePassaro;
let fogos = [];
let btnMeta;
let telaAtual = 'principal';
let nomeAgendaInput;
let servicoAgendaSelect;
let dataAgendaInput;
let horaAgendaInput;
let btnAddAgenda;
let agendamentos = [];
let editandoIndex = -1;
let btnCancelar;
let iconeNome, iconeServico, iconeData, iconeHora;
let filtroMes;
let btnAgenda;
let animandoPagamento = [];
let animacoesValor = [];
let btnBackup, btnImportar, inputFile;
let mostrarBackup = false;
let btnMenu;
let cacheLista = [];
let cacheResumo = {
  total: 0,
  recebido: 0,
  totalGeral: 0
};
let listaFiltradaGlobal = [];
let animandoPagamentoClientes = [];
let tempoFogos = 0;
let fogosJaAtivados = false;
let animarTotalGeral = 0;
let ultimoTotalGeral = 0;
let animacaoSubindo = [];
let btnRelatorio;




function preload() {
  // COLOQUE A URL DA FOTO AQUI
  fotoDona = loadImage('https://i.ibb.co/G4TMTBgr/559418991-18383504737178501-2574304252163910698-n.jpg');
}

function setup() {

  escala = window.innerWidth / 420;	
createCanvas(window.innerWidth, window.innerHeight);
	
// 🔥 ocupar tela inteira (iPhone)
larguraApp = window.innerWidth;
offsetX = 0;
	
nomeInput = createInput();
valorSelect = createSelect();
pagoCheckbox = createCheckbox('Pago', false);
botaoAdicionar = createButton('Adicionar');
buscaInput = createInput();
buscaInput.input(() => {
buscaFocada = true;
animPassaro = 1; // ativa animação
});
iconePassaro = createImg(
  'https://i.ibb.co/LXTY3twT/Captura-de-tela-2026-04-04-164912.png',
  'icone passaro'
);

 iconeNome = createImg('https://cdn-icons-png.flaticon.com/512/1077/1077114.png', 'icone');
iconeServico = createImg('https://toppng.com/uploads/preview/download-pink-nail-polish-emoji-icon-nail-polish-emoji-11563003630v0uc5v352s.png', 'icone');
	iconeData = createImg('https://cdn-icons-png.flaticon.com/512/747/747310.png', 'icone');
iconeHora = createImg('https://cdn-icons-png.flaticon.com/512/992/992700.png', 'icone');
	

// tamanho padrão
iconeNome.size(20, 20);
iconeServico.size(20, 20);
iconeData.size(20, 20);
iconeHora.size(20, 20);
	iconeNome.style('z-index', '10');
iconeServico.style('z-index', '10');
iconeData.style('z-index', '10');
iconeHora.style('z-index', '10');
	
buscaInput.elt.addEventListener('blur', () => {
  buscaFocada = false;
});
	
// POSIÇÃO CORRETA

nomeInput.position(offsetX + 19 * escala, 310 * escala);
nomeInput.size(120 * escala, 31 * escala);

valorSelect.position(offsetX + 150 * escala, 310 * escala);
valorSelect.size(60 * escala, 31 * escala);	
botaoAdicionar.position(offsetX + 306 * escala, 311 * escala);
	
pagoCheckbox.position(offsetX + 226 * escala, 315 * escala);	
	
// ESTILO IGUAL PARA OS DOIS
nomeInput.style('box-sizing', 'border-box');
valorSelect.style('box-sizing', 'border-box');
botaoAdicionar.style('box-sizing', 'border-box');

nomeInput.style('padding', '8px');
valorSelect.style('padding', '8px');
botaoAdicionar.style('padding', '8px');

nomeInput.style('border', '1px solid #ccc');
valorSelect.style('border', '1px solid #ccc');
botaoAdicionar.style('border', '1px solid #ccc');
	
nomeInput.style('border-radius', '6px');
valorSelect.style('border-radius', '6px');
botaoAdicionar.style('border-radius', '6px');

buscaInput.style('border', 'none');
buscaInput.style('border-radius', '20px');
buscaInput.style('padding', '10px 15px');
buscaInput.style('background-color', '#f1f2f6');
buscaInput.style('font-size', '14px');
buscaInput.style('outline', 'none');
buscaInput.style('box-shadow', '0 2px 6px rgba(0,0,0,0.1)');
buscaInput.style('box-sizing', 'border-box');
buscaInput.size(larguraApp - 30, 40 * escala);
	buscaInput.position(offsetX + 20 * escala, 360 * escala);
	
	let tamanho = 24 + animPassaro * 10;
iconePassaro.size(tamanho, tamanho);
	
	
try {
  let dados = localStorage.getItem('clientes');
  if (dados) clientes = JSON.parse(dados);
} catch (e) {
  clientes = [];
  console.error('Erro ao carregar clientes', e);
}

// 🔥 AQUI 👇
let dadosAgenda = localStorage.getItem('agendamentos');
if (dadosAgenda) {
  agendamentos = JSON.parse(dadosAgenda);
}

	

// 🔥 SALVAR METAS
let dadosMeta = localStorage.getItem('metas');
if (dadosMeta) metasPorMes = JSON.parse(dadosMeta);
	
for (let c of clientes) {
  if (!c.data) continue;
}
	
// Buscar por MES
	
filtroMes = createSelect();

filtroMes.position(offsetX + 275 * escala, 100 * escala);
filtroMes.size(150, 35);
	
filtroMes.style('border-radius', '10px');
filtroMes.style('padding', '6px');
filtroMes.style('background-color', '#f1f2f6');
filtroMes.style('border', 'none');
filtroMes.style('outline', 'none');
filtroMes.style('background-color', 'transparent');
filtroMes.style('font-size', '14px');
filtroMes.style('color', '#555');
filtroMes.style('cursor', 'pointer');
filtroMes.style('background-color', '#f1f2f6');
filtroMes.style('padding', '6px 10px');
filtroMes.style('border-radius', '8px');
filtroMes.style('font-weight', 'bold');
filtroMes.style('font-weight', 'bold');
filtroMes.style('color', '#ff69b4'); // rosa do seu app
filtroMes.style('transition', '0.2s');

filtroMes.option('Filtrar por mês');
filtroMes.option('Janeiro');
filtroMes.option('Fevereiro');
filtroMes.option('Março');
filtroMes.option('Abril');
filtroMes.option('Maio');
filtroMes.option('Junho');
filtroMes.option('Julho');
filtroMes.option('Agosto');
filtroMes.option('Setembro');
filtroMes.option('Outubro');
filtroMes.option('Novembro');
filtroMes.option('Dezembro');
	
filtroMes.changed(() => {
  let meses = {
    'Janeiro': 0,
    'Fevereiro': 1,
    'Março': 2,
    'Abril': 3,
    'Maio': 4,
    'Junho': 5,
    'Julho': 6,
    'Agosto': 7,
    'Setembro': 8,
    'Outubro': 9,
    'Novembro': 10,
    'Dezembro': 11
  };

  let valor = filtroMes.value();

  if (meses[valor] !== undefined) {
    mesSelecionado = meses[valor];
  } else {
    mesSelecionado = null;
  }
	atualizarCache();
});

btnAgenda = createButton('📅');

btnAgenda.position(offsetX + 225 * escala, 100 * escala);
btnAgenda.size(40 * escala, 35 * escala);

btnAgenda.style('border', 'none');
btnAgenda.style('border-radius', '8px');
btnAgenda.style('background-color', '#f1f2f6');
btnAgenda.style('cursor', 'pointer');
btnAgenda.style('font-size', '16px');

btnAgenda.mousePressed(() => {
  telaAtual = 'agenda';
});

	// 👇🔥 COLE AQUI
btnRelatorio = createButton('📊');

btnRelatorio.position(offsetX + 300 * escala, 230 * escala);
	btnRelatorio.size(40 * escala, 35 * escala);

btnRelatorio.style('border', 'none');
btnRelatorio.style('border-radius', '8px');
btnRelatorio.style('background-color', '#f1f2f6');

btnRelatorio.mousePressed(() => {
  telaAtual = 'relatorio';
});
	
btnMeta = createButton('✏️');
btnMeta.position(offsetX + 350, 232);
btnMeta.size(40 * escala, 30 * escala);
	btnMeta.hide();

btnMeta.style('background-color', 'transparent');
btnMeta.style('color', '#666');
btnMeta.style('border', 'none');
btnMeta.style('font-size', '16px');
btnMeta.style('cursor', 'pointer');
btnMeta.style('border-radius', '8px');
btnMeta.style('font-size', '12px');

btnMeta.mousePressed(() => {
  if (mesSelecionado === null) {
    alert('Escolha um mês primeiro');
    return;
  }

  let valor = prompt('Digite a meta para este mês:');

  if (!isNaN(valor) && valor !== null) {
    metasPorMes[mesSelecionado] = float(valor);
	  localStorage.setItem('metas', JSON.stringify(metasPorMes));
  }
});
	
// SELECT
valorSelect.option('Pé', 35);
valorSelect.option('Mão', 25);
valorSelect.option('Pé + Mão', 50);
valorSelect.option('Aplicação em Gel', 130);
valorSelect.option('Aplicação em Gel + Pé', 165);
valorSelect.option('Manut. Simples', 100);
valorSelect.option('Manut. Simples + Pé', 135);
valorSelect.option('Manut c/ Decoração ', 110);
valorSelect.option('Manut c/ Decoração + Pé ', 145);


	
// BOTÃO
botaoAdicionar.size(120 * escala, 30 * escala);
	botaoAdicionar.style('background-color', '#ff69b4');
  botaoAdicionar.style('color', 'white');
  botaoAdicionar.style('border', 'none');
  botaoAdicionar.style('border-radius', '8px');
  botaoAdicionar.mousePressed(adicionarCliente);
	// ====== INPUTS DA AGENDA ======

// NOME
nomeAgendaInput = createInput();
	nomeAgendaInput.style('z-index', '1');
nomeAgendaInput.position(offsetX + 50 * escala, 510 * escala);
nomeAgendaInput.size(300 * escala, 30 * escala);
nomeAgendaInput.attribute('placeholder', 'Nome do cliente');
	
	nomeAgendaInput.style('z-index', '1');

nomeAgendaInput.style('border', 'none');
nomeAgendaInput.style('border-radius', '10px');
nomeAgendaInput.style('padding', '10px');
nomeAgendaInput.style('background-color', '#f3f3f3');
	nomeAgendaInput.style('padding-left', '35px');
nomeAgendaInput.style('box-sizing', 'border-box');
	nomeAgendaInput.style('overflow', 'hidden');
nomeAgendaInput.style('text-overflow', 'ellipsis');
nomeAgendaInput.style('white-space', 'nowrap');
	

// SERVIÇO
servicoAgendaSelect = createSelect();
	servicoAgendaSelect.style('z-index', '1');
servicoAgendaSelect.position(offsetX + 50 * escala, 555 * escala);
servicoAgendaSelect.size(300 * escala, 30 * escala);
	servicoAgendaSelect.style('border', 'none');
servicoAgendaSelect.style('border-radius', '10px');
servicoAgendaSelect.style('padding', '7px');
servicoAgendaSelect.style('background-color', '#f3f3f3');
	servicoAgendaSelect.style('padding-left', '35px');
	servicoAgendaSelect.style('box-sizing', 'border-box');

servicoAgendaSelect.option('Pé', 35);
servicoAgendaSelect.option('Mão', 25);
servicoAgendaSelect.option('Pé + Mão', 50);
servicoAgendaSelect.option('Aplicação em Gel', 130);
servicoAgendaSelect.option('Aplicação em Gel + Pé', 165);
servicoAgendaSelect.option('Manut. Simples', 100);
servicoAgendaSelect.option('Manut. Simples + Pé', 135);
servicoAgendaSelect.option('Manut c/ Decoração', 110);
servicoAgendaSelect.option('Manut c/ Decoração + Pé', 145);

	
// DATA
dataAgendaInput = createInput();
	dataAgendaInput.style('z-index', '1');
dataAgendaInput.position(offsetX + 50 * escala, 600 * escala);
dataAgendaInput.size(140 * escala, 30 * escala);
dataAgendaInput.attribute('type', 'date');

	dataAgendaInput.style('border', 'none');
dataAgendaInput.style('border-radius', '10px');
dataAgendaInput.style('padding', '10px');
dataAgendaInput.style('background-color', '#f3f3f3');
dataAgendaInput.style('padding-left', '35px');
	dataAgendaInput.style('box-sizing', 'border-box');
	
// HORA
horaAgendaInput = createInput();
	horaAgendaInput.style('z-index', '1');
horaAgendaInput.position(offsetX + 210 * escala, 600 * escala);
horaAgendaInput.size(140 * escala, 30 * escala);
	horaAgendaInput.attribute('type', 'time');
	horaAgendaInput.style('border', 'none');
horaAgendaInput.style('border-radius', '10px');
horaAgendaInput.style('padding', '10px');
horaAgendaInput.style('background-color', '#f3f3f3');
horaAgendaInput.style('padding-left', '35px');
	horaAgendaInput.style('box-sizing', 'border-box');
	
// BOTÃO
btnAddAgenda = createButton('Adicionar');
btnAddAgenda.position(offsetX + 120 * escala, 645 * escala);
btnAddAgenda.size(180, 40);

btnCancelar = createButton('Cancelar');

btnCancelar.position(offsetX + 120 * escala, 690 * escala);
btnCancelar.size(180, 35);

btnCancelar.style('background-color', '#ccc');
btnCancelar.style('color', '#333');
btnCancelar.style('border', 'none');
btnCancelar.style('border-radius', '10px');

btnCancelar.hide();

btnAddAgenda.style('background-color', '#ff69b4');
btnAddAgenda.style('color', 'white');
btnAddAgenda.style('border', 'none');
btnAddAgenda.style('border-radius', '10px');
btnAddAgenda.style('box-sizing', 'border-box');
	
// ação do botão
btnAddAgenda.mousePressed(adicionarAgendamento);
btnCancelar.mousePressed(() => {
  editandoIndex = -1;

  nomeAgendaInput.value('');
  dataAgendaInput.value('');
  horaAgendaInput.value('');
});
  
  // 💾 BACKUP (ícone pequeno)
btnBackup = createButton('💾');
btnBackup.position(offsetX + larguraApp - 340, 100);
btnBackup.size(35, 35);
btnBackup.style('border', 'none');
btnBackup.style('border-radius', '8px');
btnBackup.style('background-color', '#f1f2f6');
btnBackup.style('cursor', 'pointer');
btnBackup.style('font-size', '16px');
btnBackup.mousePressed(exportarBackup);

// 📂 IMPORTAR
inputFile = createFileInput(importarBackup);
  inputFile.position(offsetX + larguraApp - 50, 100);
inputFile.size(35, 35);
inputFile.style('opacity', '0');

// botão bonito
btnImportar = createButton('📂');
  btnImportar.position(offsetX + larguraApp - 380, 100);
btnImportar.size(35, 35);
btnImportar.style('border', 'none');
btnImportar.style('border-radius', '8px');
btnImportar.style('background-color', '#f1f2f6');
btnImportar.style('cursor', 'pointer');
btnImportar.style('font-size', '16px');

btnImportar.mousePressed(() => {
  inputFile.elt.click();
});
  btnMenu = createButton('⚙️');
btnMenu.position(offsetX + larguraApp - 0, 92);
  btnMenu.size(50, 50);
btnMenu.style('border', 'none');
btnMenu.style('border-radius', '16px');
btnMenu.style('background-color', 'transparent');
  btnMenu.style('cursor', 'pointer');
 btnMenu.style('border', 'none');
btnMenu.style('outline', 'none');
btnMenu.style('box-shadow', 'none');

btnMenu.mousePressed(() => {
  mostrarBackup = !mostrarBackup;
});
  
  btnBackup.hide();
btnImportar.hide();
inputFile.hide();
atualizarCache();

	// 🔥 AUTO BACKUP
setInterval(() => {
  localStorage.setItem('backup_auto', JSON.stringify({
    clientes,
    agendamentos,
    metasPorMes
  }));
}, 30000); // a cada 30 segundos

}


function draw() {
  background('#f8f8fb');

  if (telaAtual === 'principal') {
    telaPrincipal();

  } else if (telaAtual === 'agenda') {
    telaAgenda();

  } else if (telaAtual === 'relatorio') {
    telaRelatorio();
  }
}


function telaAgenda() {

// 🔥 ESCONDER PRINCIPAL
buscaInput.hide();
nomeInput.hide();
valorSelect.hide();
pagoCheckbox.hide();
botaoAdicionar.hide();
	
// 🔥 ESCONDER ELEMENTOS QUE NÃO SÃO DA AGENDA
btnMeta.hide();
btnMenu.hide();
	btnRelatorio.hide();
	iconePassaro.hide(); // 👈 BORBOLETA SUME
	
// 🔥 MOSTRAR AGENDA
nomeAgendaInput.show();
servicoAgendaSelect.show();
dataAgendaInput.show();
horaAgendaInput.show();
btnAddAgenda.show();
btnAgenda.show();
filtroMes.show();

// cancelar só quando editando
if (editandoIndex >= 0) {
  btnCancelar.show();
  btnAddAgenda.html('Salvar edição'); // 🔥 AQUI
} else {
  btnCancelar.hide();
  btnAddAgenda.html('Adicionar'); // 🔥 AQUI
}
	
  background('#f8f8fb');
	  textFont('Helvetica'); // 👈 AQUI

  // TÍTULO
  fill('#ff69b4');
  textSize(20 * escala);
  textStyle(BOLD);
  text('Agendamento 📅', offsetX + 20, 40);

  // BOTÃO VOLTAR
  fill('#ff69b4');
rect(offsetX + 20 * escala, 60 * escala, 120 * escala, 50 * escala, 12 * escala);
  fill(255);
textSize(14 * escala);
  textAlign(CENTER, CENTER);
  text('Voltar', offsetX + 80, 85);

  textAlign(LEFT);

if (mesSelecionado === null) {

  // 🔼 ALTURA FILTRO DO MêS
filtroMes.position(offsetX + 275 * escala, 100 * escala);
  btnAgenda.position(offsetX + 225, 70);
  
  // 🔥 CARD "AGENDA DE HOJE"
  fill(255);
  stroke(230);
  rect(offsetX + 20, 130, larguraApp - 40, 370, 15);
  fill('#ff69b4');
  textSize(14);
  text('📅 Agenda de Hoje', offsetX + 30, 155);

  // LISTA DE HORÁRIOS
  fill(0);
textSize(13 * escala);

 let yHoje = 195;
let hoje = formatarData(new Date());
let contador = 0; // 👈 controla quantidade

for (let i = 0; i < agendamentos.length; i++) {
  let a = agendamentos[i];
  if (a.data === hoje) {

    if (contador >= 6) break;

    let xCard = offsetX + 20;
    let larguraCard = larguraApp - 40;

    // sombra suave
    drawingContext.shadowColor = 'rgba(0,0,0,0.08)';
    drawingContext.shadowBlur = 8;

    
// animação
if (animandoPagamento[i] > 0) {
  let alpha = map(animandoPagamento[i], 20, 0, 150, 0);
  fill(46, 204, 113, alpha); // verde com transparência
  rect(xCard, yHoje - 15, larguraCard, 50, 12);

  animandoPagamento[i]--;
} else {
  fill(255);
  rect(xCard, yHoje - 15, larguraCard, 50, 12);
}

// linha verde lateral
if (a.pago) {
  let x = xCard;
  let yBar = yHoje - 15;
  let altura = 50;

  let grad = drawingContext.createLinearGradient(x, yBar, x, yBar + altura);
  grad.addColorStop(0, '#55efc4');
  grad.addColorStop(1, '#00b894');

  drawingContext.fillStyle = grad;
  rect(x, yBar, 6, altura, 12);
}

    drawingContext.shadowBlur = 0;

   // avatar com ícone inteligente
let primeiroNome = (a.nome || '').split(' ')[0].toLowerCase();

let corAvatar;
let icone;

if (primeiroNome.endsWith('a')) {
  corAvatar = '#ff69b4'; // feminino
  icone = '👩';
} else {
  corAvatar = '#3498db'; // masculino
  icone = '👨';
}

fill(corAvatar);
ellipse(xCard + 25, yHoje + 5, 30, 30);

fill(255);
textSize(22 * escala);
	  textAlign(CENTER, CENTER);
text(icone, xCard + 25, yHoje + 5);

    // NOME (esquerda)
fill(20);
textSize(15);
textStyle(BOLD);
textAlign(LEFT, CENTER);
	  
let nomeMax = 120;

let nome = a.nome;
while (textWidth(nome) > nomeMax) {
  nome = nome.slice(0, -1);
}

if (nome !== a.nome) nome += '...';

text(nome, xCard + 50, yHoje - 8);


// HORÁRIO
text(a.hora, xCard + larguraCard - 130, yHoje);

// ✅ BOTÃO PAGO
fill('#2ecc71');
rect(xCard + larguraCard - 70, yHoje - 15, 25, 25, 6);

fill(255);
textAlign(CENTER, CENTER);
text('✔', xCard + larguraCard - 58, yHoje - 3);

    // ✏️ BOTÃO EDITAR
fill('#3498db');
rect(xCard + larguraCard - 40, yHoje - 15, 25, 25, 6);

fill(255);
textAlign(CENTER, CENTER);
text('E', xCard + larguraCard - 28, yHoje - 3);

textAlign(LEFT);

textAlign(LEFT);

// SERVIÇO + VALOR (centro)
fill(120);
textSize(13);
textAlign(CENTER, CENTER);

let meio = (xCard + 50 + xCard + larguraCard - 15) / 2;

let valorServico = a.valor || '';
let nomeServico = a.servico;

// 🔥 converte número em nome do serviço
if (!isNaN(nomeServico)) {
  let mapaServicos = {
  25: 'Mão',
  35: 'Pé',
  50: 'Pé + Mão',
  130: 'Aplicação em Gel',
  165: 'Aplicação em Gel + Pé',
  100: 'Manut. Simples',
  135: 'Manut. Simples + Pé',
  110: 'Manut c/ Decoração',
  145: 'Manut c/ Decoração + Pé'
};

  nomeServico = mapaServicos[nomeServico] || 'Serviço';
}

let textoServico = nomeServico + ' • R$' + valorServico;
	  

let limite = 220;

while (textWidth(textoServico) > limite) {
  textoServico = textoServico.slice(0, -1);
}

if (textoServico !== nomeServico + ' • R$' + valorServico) {
  textoServico += '...';
}
	  
// SERVIÇO (linha de baixo)
textAlign(LEFT, CENTER);
textSize(13);
fill(120);
text(textoServico, xCard + 50, yHoje + 10);
	  
    // linha divisória
    stroke(240);
    line(xCard + 50, yHoje + 20, xCard + larguraCard - 15, yHoje + 20);

    noStroke();

   a._yHoje = yHoje;

yHoje += 50;
contador++;
	  
  }
}
	if (yHoje === 180) {
  fill(120);
  textSize(13);
  text('Nenhum agendamento hoje', offsetX + 30, 180);
}
}		
  
  // 💸 ANIMAÇÃO DE DINHEIRO
for (let i = animacoesValor.length - 1; i >= 0; i--) {
  let a = animacoesValor[i];

  let alpha = map(a.vida, 60, 0, 255, 0);

  fill(46, 204, 113, alpha);
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER);

  text(`+R$${a.valor} 💸`, a.x, a.y);

  a.y -= 1;
  a.vida--;

  if (a.vida <= 0) {
    animacoesValor.splice(i, 1);
  }
}

textAlign(LEFT);
  
  
	// 🔽 COLOCA AQUI 👇
if (mesSelecionado !== null) {
filtroMes.position(offsetX + 275 * escala, 100 * escala);
}
	


  // 🔥 LISTA DE AGENDAMENTOS
  let y = 160;

	// 🔥 CARD DO FORMULÁRIO
fill(255);
stroke(230);
strokeWeight(1);

// sombra
drawingContext.shadowColor = 'rgba(0,0,0,0.1)';
drawingContext.shadowBlur = 10;

rect(offsetX + 20, 480, larguraApp - 40, 220, 15);
	
	fill('#ff69b4');
textSize(14);
text('Novo Agendamento', offsetX + 100, 496);

// remove sombra
drawingContext.shadowBlur = 0;

if (mesSelecionado !== null) {

  let ultimaData = '';

  // 🔥 COLOCA AQUI 👇
  let alturaLista = agendamentos.length * 70;
  let alturaVisivel = 350;

  let limite = alturaVisivel - alturaLista;
  limite = min(0, limite);

  scrollY = constrain(scrollY, limite, 0);

  push();

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(0, 150, width, 300);
  drawingContext.clip();

  translate(0, scrollY);

  // 🔥 AGORA COMEÇA O FOR
for (let i = 0; i < agendamentos.length; i++) {
  let a = agendamentos[i];
  let dataFormatada = a.data;
  
if (!a.data) continue;

let dataObj = new Date(a.data);
if (isNaN(dataObj)) continue;
	
    let mesAgendamento = dataObj.getMonth();

    if (mesAgendamento !== mesSelecionado) {
      continue;
    }
if (dataFormatada !== ultimaData) {

  fill('#ff69b4');
  textSize(14);
  textStyle(BOLD);
  text('📅 ' + formatarDataBR(dataFormatada), offsetX + 25, y + 4);

  y += 20;

  ultimaData = dataFormatada;
}
    // 🔥 DESENHO DO CARD
	  
let xCard = offsetX + 20;
let larguraCard = larguraApp - 40;

// sombra
drawingContext.shadowColor = 'rgba(0,0,0,0.08)';
drawingContext.shadowBlur = 8;
// fundo branco
fill(255);
noStroke();
rect(xCard, y - 5, larguraCard, 60, 12);

// 🔥 barrinha verde se estiver pago
if (a.pago) {
  let x = xCard;
  let yBar = y - 5;
  let altura = 60;

  let grad = drawingContext.createLinearGradient(x, yBar, x, yBar + altura);
  grad.addColorStop(0, '#55efc4');
  grad.addColorStop(1, '#00b894');

  drawingContext.fillStyle = grad;
  rect(x, yBar, 6, altura, 12);
}
	  a._y = y;

drawingContext.shadowBlur = 0;

// avatar com ícone inteligente
let primeiroNome = (a.nome || '').split(' ')[0].toLowerCase();

let corAvatar;
let icone;

if (primeiroNome.endsWith('a')) {
  corAvatar = '#ff69b4'; // feminino
  icone = '👩';
} else {
  corAvatar = '#3498db'; // masculino
  icone = '👨';
}

fill(corAvatar);
ellipse(xCard + 25, y + 20, 30, 30);

fill(255);
textSize(22);
textAlign(CENTER, CENTER);
text(icone, xCard + 25, y + 20);

// ===== NOME
fill(20);
textSize(15);
textStyle(BOLD);
textAlign(LEFT, CENTER);
text(a.nome, xCard + 50, y + 10);

// ===== HORA (direita)
textAlign(RIGHT, CENTER);
textSize(13);
fill(120);
text(a.hora, xCard + larguraCard - 80, y + 20);

// ===== SERVIÇO + VALOR
textAlign(LEFT, CENTER);
textSize(13);
fill(120);

let nomeServico = a.servico;

// 🔥 se vier como número, converte
if (!isNaN(nomeServico)) {
  let mapaServicos = {
  25: 'Mão',
  35: 'Pé',
  50: 'Pé + Mão',
  130: 'Aplicação em Gel',
  165: 'Aplicação em Gel + Pé',
  100: 'Manut. Simples',
  135: 'Manut. Simples + Pé',
  110: 'Manut c/ Decoração',
  145: 'Manut c/ Decoração + Pé'
};

  nomeServico = mapaServicos[nomeServico] || 'Serviço';
}

let textoServico = nomeServico + ' • R$' + a.valor;
text(textoServico, xCard + 50, y + 30);

// linha
stroke(240);
line(xCard + 50, y + 40, xCard + larguraCard - 15, y + 40);

noStroke();

// botões (ajustados)
let xBtn = xCard + larguraCard - 60;

fill('#3498db');
rect(xBtn, y + 10, 25, 25, 6);

fill(255);
textAlign(CENTER, CENTER);
text('E', xBtn + 12, y + 22);

fill('#e74c3c');
rect(xBtn + 30, y + 10, 25, 25, 6);

fill(255);
text('X', xBtn + 42, y + 22);

// reset align
textAlign(LEFT);

// altura menor pra combinar com layout
y += 65;
	  
  }
drawingContext.restore();
pop();
	
}


}


function telaPrincipal() {

	// 🔥 MOSTRAR ELEMENTOS DA PRINCIPAL

buscaInput.show();
nomeInput.show();
valorSelect.show();
pagoCheckbox.show();
botaoAdicionar.show();
btnAgenda.show();
filtroMes.show();
btnMenu.show();

	if (mostrarBackup) {
  btnBackup.show();
  btnImportar.show();
} else {
  btnBackup.hide();
  btnImportar.hide();
}
	
if (mesSelecionado === null) {
  btnRelatorio.show();
} else {
  btnRelatorio.hide();
}
	
// 🔥 ESCONDER OUTROS
nomeAgendaInput.hide();
servicoAgendaSelect.hide();
dataAgendaInput.hide();
horaAgendaInput.hide();
btnAddAgenda.hide();
btnCancelar.hide();
	
		background('#f8f8fb');
	
	if (mesSelecionado === null) {
  btnMeta.hide();
} else {
  btnMeta.show();
}
	
  piscar = (sin(frameCount * 0.1) + 1) / 2;
  animPassaro *= 0.9;

	let tamanho = 80 + animPassaro * 15;

iconePassaro.size(tamanho, tamanho);

let paddingDireita = 98;

iconePassaro.position(
  buscaInput.x + buscaInput.width - iconePassaro.width - paddingDireita,
  buscaInput.y + (buscaInput.height - iconePassaro.height) / 2
);

  desenharHeader();
  desenharCards();
  desenharFogos();
	
// 🔥 AQUI DENTRO
  let larguraBusca = buscaFocada ? 340 : 300;

// BUSCAR CLIENTE
buscaInput.attribute('placeholder', 'Digite para buscar cliente 🔍...');

// 🔥 CALCULAR LIMITE
let inicioLista = 410;
let alturaItem = 74;
let alturaLista = cacheLista.length * alturaItem;
	
// altura visível da área da lista
let alturaVisivel = height - inicioLista;

// limite correto
let limite = alturaVisivel - alturaLista;

limite = min(0, limite);
scrollY = constrain(scrollY, limite, 0);

// 🔥 TRAVAR ROLAGEM
scrollY = constrain(scrollY, limite, 0);

push();

// cria área de recorte manual
drawingContext.save();
drawingContext.beginPath();
drawingContext.rect(0, 371, width, height - 410);
drawingContext.clip();

translate(0, scrollY);

	let busca = (buscaInput?.value() || '').trim();

if (busca.length > 0) {
  desenharLista();
}

// remove o recorte
drawingContext.restore();

pop();
  
  // 💸 ANIMAÇÃO DE DINHEIRO (TELA PRINCIPAL)
for (let i = animacoesValor.length - 1; i >= 0; i--) {
  let a = animacoesValor[i];

  let alpha = map(a.vida, 60, 0, 255, 0);

  fill(46, 204, 113, alpha);
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER);

  text(`+R$${a.valor} 💸`, a.x, a.y);

  a.y -= 1;
  a.vida--;

  if (a.vida <= 0) {
    animacoesValor.splice(i, 1);
  }
}

textAlign(LEFT);
}

function mouseWheel(event) {
  scrollY -= event.delta * 0.8;
  return false;
}

function salvar() {
  try {
    localStorage.setItem('clientes', JSON.stringify(clientes));
    atualizarCache();
  } catch (e) {
    alert('Erro ao salvar dados! Seu armazenamento pode estar cheio.');
    console.error(e);
  }
}

// 👇 COLE AQUI EMBAIXO
function atualizarCache() {

  cacheLista = [];

  let total = 0;
  let recebido = 0;
  let totalGeral = 0;

  for (let c of clientes) {

    if (c.pago) totalGeral += c.valor;

    if (mesSelecionado !== null) {
      if (!c.data) continue;

      let dataObj = new Date(c.data);
      let mes = dataObj.getMonth();

      if (mes !== mesSelecionado) continue;
    }

    total += c.valor;
    if (c.pago) recebido += c.valor;

    cacheLista.push(c);
  }

  cacheResumo.total = total;
  cacheResumo.recebido = recebido;
  cacheResumo.totalGeral = totalGeral;
}

function desenharHeader() {
  fill('#d7bfae');
  rect(0, 0, width, 90);

  // FOTO REDONDA
 if (fotoDona) {
  push();

  // Sombra suave
  drawingContext.shadowColor = 'rgba(0,0,0,0.2)';
  drawingContext.shadowBlur = 10;

  // Círculo branco (borda)
  fill(255);
  noStroke();
  ellipse(60, 60, 90, 90);

  // Recorte redondo da imagem
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(60, 60, 40, 0, TWO_PI);
  drawingContext.clip();

  image(fotoDona, 20, 20, 80, 80);

  drawingContext.restore();
  pop();
}

  fill(255);
  textSize(18);
  textStyle(BOLD);
  textAlign(LEFT);
  text('Ana Beatriz Nails Designer 💅', 120, 45);

  textSize(12);
  textStyle(NORMAL);
  text('Controle financeiro', 120, 65);
}

function desenharCards() {

  let total = cacheResumo.total;
  let recebido = cacheResumo.recebido;
  let totalGeralRecebido = cacheResumo.totalGeral;
	if (totalGeralRecebido > ultimoTotalGeral) {
  animarTotalGeral = 30; // duração do efeito

  animacaoSubindo.push({
    x: width / 2 + 60,
    y: 260,
    valor: totalGeralRecebido - ultimoTotalGeral,
    vida: 60
  });
}

ultimoTotalGeral = totalGeralRecebido;

  // 🔥 SEM MÊS SELECIONADO
  if (mesSelecionado === null) {

    let largura = 300;
    let altura = 120;

    let margem = 70;
    let x = offsetX + margem;

    let topo = 180;
    let base = 360;

    let y = topo + (base - topo - altura) / 2;
    y -= 56;

   drawingContext.shadowColor = 'rgba(0,0,0,0.15)';
drawingContext.shadowBlur = 20;

fill(255);
stroke(230);
rect(x, y, largura, altura, 20);

drawingContext.shadowBlur = 0;

// 🔥 TÍTULO
fill(120);
textSize(14);
textAlign(CENTER);
text('Total Recebido (Geral)', width / 2, y + 35);

// 🔥 VALOR
if (animarTotalGeral > 0) {
  fill('#2ecc71');
  animarTotalGeral--;
} else {
  fill(0);
}

textSize(28);
textStyle(BOLD);
text(`R$ ${totalGeralRecebido}`, width / 2, y + 75);

// 💸 ANIMAÇÃO
for (let i = animacaoSubindo.length - 1; i >= 0; i--) {
  let a = animacaoSubindo[i];

  let alpha = map(a.vida, 60, 0, 255, 0);

  fill(46, 204, 113, alpha);
  textSize(18);
  textAlign(CENTER);

  text(`+R$${a.valor} 💸`, width / 2, a.y);

  a.y -= 1.2;
  a.vida--;

  if (a.vida <= 0) {
    animacaoSubindo.splice(i, 1);
  }
}

textAlign(LEFT);

    return;
  }

  // 🔥 COM MÊS SELECIONADO
  let falta = total - recebido;

  let larguraCard = 180;
  let espacamento = 20;

  let totalLargura = larguraCard * 2 + espacamento;

  let inicioX = offsetX + (larguraApp - totalLargura) / 2 + 13;

  let yInicio = 145;

  let metaAtual = metasPorMes[mesSelecionado] || 0;
  let metaBatida = recebido >= metaAtual && metaAtual > 0;

  desenharCard(inicioX, yInicio, 'Total', total);
  desenharCard(inicioX + larguraCard + espacamento, yInicio, 'Recebido', recebido);

  desenharCard(inicioX, yInicio + 70, 'A Receber', falta);
desenharCard(
  inicioX + larguraCard + espacamento,
  yInicio + 70,
  'Meta',
  metaAtual,
  metaBatida // 👈 ISSO AQUI ATIVA O PISCAR
);
	
 if (metaBatida && !fogosJaAtivados) {
  tempoFogos = 600;
  fogosJaAtivados = true;
}

if (tempoFogos > 0) {
  if (frameCount % 10 === 0) {
    soltarFogos();
  }
  tempoFogos--;
}

// 🔥 RESET (IMPORTANTE)
if (!metaBatida) {
  fogosJaAtivados = false;
}
	
  let brilho = 200 + 55 * sin(frameCount * 0.2);

  if (metaBatida) {
    fill(brilho, 255, brilho);
    stroke('#00c853');
    strokeWeight(2);
  } else {
    fill(255);
    stroke(230);
    strokeWeight(1);
  }

  // 🔥 TEXTO DEVEDORES (agora usando cache)
  let texto = '';

  for (let c of cacheLista) {
    if (!c.pago) {
      texto += c.nome + ' |🔴 Pendente|     •   ';
    }
  }

  noStroke();
  fill('#2d3436');
  textSize(13);
  textStyle(BOLD);

  scrollTexto -= 0.5;

  if (scrollTexto < -textWidth(texto) - 50) {
    scrollTexto = 420;
  }

  let x = 30 + scrollTexto;
  let partes = texto.split('|');

  for (let i = 0; i < partes.length; i++) {
    if (i % 2 === 0) {
      fill('#2d3436');
    } else {
      fill(frameCount % 30 < 15 ? '#ff0000' : '#2d3436');
    }

    text(partes[i], x, 295);
    x += textWidth(partes[i]);
  }
}

function desenharCard(x, y, titulo, valor, destaque = false) {

  if (destaque) {
    let brilho = 200 + 55 * sin(frameCount * 0.2);

    fill(brilho, 255, brilho);
    stroke('#00c853');
    strokeWeight(2);
  } else {
    fill(255);
    stroke(230);
    strokeWeight(1);
  }

  rect(x, y, 180, 60, 12);

  noStroke();
  fill(120);
  textSize(12);
  text(titulo, x + 10, y + 20);

  fill(0);
  textSize(16);
  textStyle(BOLD);
  text(`R$ ${valor}`, x + 10, y + 45);
}

function desenharLista() {
  
	let y = 410;
listaFiltradaGlobal = [];
for (let c of cacheLista) {
  let busca = (buscaInput?.value() || '').toLowerCase();
  let nome = (c.nome || '').toLowerCase();

  // 🔎 filtro de busca
  if (!nome.includes(busca)) continue;

listaFiltradaGlobal.push(c);
}
	
	textSize(18);
fill(0);
textStyle(BOLD);

  y += 30;

  for (let i = 0; i < listaFiltradaGlobal.length; i++) {
let c = listaFiltradaGlobal[i];	  
	
	  let busca = (buscaInput?.value() || '').toLowerCase();


    // sombra suave
drawingContext.shadowColor = 'rgba(0,0,0,0.1)';
drawingContext.shadowBlur = 10;

noStroke();

// cor diferente se estiver pago
// fundo sempre branco
if (animandoPagamentoClientes[i] > 0) {
  let alpha = map(animandoPagamentoClientes[i], 20, 0, 150, 0);

  fill(46, 204, 113, alpha);
  rect(offsetX + 20, y, larguraApp - 15, 70);

  animandoPagamentoClientes[i]--;
} else {
  fill(255);
  rect(offsetX + 20, y, larguraApp - 15, 70);
}

// 🔥 barrinha verde lateral
if (c.pago) {
	
  let x = offsetX + 20;
let altura = 70;

let grad = drawingContext.createLinearGradient(x, y, x, y + altura);
grad.addColorStop(0, '#55efc4');
grad.addColorStop(1, '#00b894');

drawingContext.fillStyle = grad;
rect(x, y, 6, altura, 12);
}
	  
// remove sombra pra não afetar outros elementos
drawingContext.shadowBlur = 0;

    noStroke();
fill('#2d3436');
textSize(15);
textStyle(BOLD);
let linhaTopo = y + 25;

// NOME
textAlign(LEFT);
fill('#2d3436');
textSize(15);
textStyle(BOLD);
	  
let nomeCompleto = c.nome;
let partes = nomeCompleto.split(' ');

// pega pelo menos nome + sobrenome
let nomeBase = partes.slice(0, 2).join(' ');

// se só tiver um nome, usa ele mesmo
if (partes.length === 1) {
  nomeBase = partes[0];
}

let nomeAjustado = nomeBase;

// se ainda couber mais texto, tenta adicionar mais partes
for (let i = 2; i < partes.length; i++) {
  let teste = nomeAjustado + ' ' + partes[i];
  
  if (textWidth(teste) < 180) {
    nomeAjustado = teste;
  } else {
    break;
  }
}

// se ainda ultrapassar, corta com ...
while (textWidth(nomeAjustado) > 180) {
  nomeAjustado = nomeAjustado.slice(0, -1);
}

if (nomeAjustado !== nomeCompleto) {
  nomeAjustado += '...';
}
	  
// NOME
textAlign(LEFT);
fill('#2d3436');
textSize(15);
textStyle(BOLD);
text(nomeAjustado, offsetX + 30, linhaTopo);

// VALOR
textAlign(RIGHT);

textAlign(LEFT);
textSize(11);
fill(120);
text(c.servico, offsetX + 30, linhaTopo + 15);

fill(0);
textSize(14);

// ===== BASE
let baseBotoes = offsetX + larguraApp - 100;
let colunaDireita = offsetX + larguraApp - 119;

// DATA
textAlign(RIGHT);
fill(150);
textSize(10);
text(formatarDataBR(c.data), colunaDireita, y + 45);
    
// ===== STATUS
let status = c.pago ? 'Pago' : 'Pendente';

fill(c.pago ? '#2ecc71' : '#e74c3c');
textSize(13);
text(status, colunaDireita, y + 25);

// ===== VALOR
fill(0);
textSize(14);
text(`R$ ${c.valor}`, baseBotoes - 95, linhaTopo);

textAlign(LEFT);

	  
// LIXEIRA
fill('#e74c3c');
rect(offsetX + larguraApp - 25, y + 10, 20, 20, 5); // lixeira
fill(255);
textSize(12);
textAlign(CENTER, CENTER);
text('🗑', offsetX + larguraApp - 15, y + 20);
	  
    // CONFIRMAR
    fill('#2ecc71');
    rect(offsetX + larguraApp - 100, y + 10, 20, 20, 5); // check
    fill(255);
   textAlign(CENTER, CENTER);
text('✔', offsetX + larguraApp - 90, y + 20);

    // EDITAR
    fill('#3498db');
    rect(offsetX + larguraApp - 75, y + 10, 20, 20, 5); // editar
    fill(255);
	textAlign(CENTER, CENTER);
    text('E', offsetX + larguraApp - 65, y + 20);

    // DESFAZER
    fill('#e67e22');
    rect(offsetX + larguraApp - 50, y + 10, 20, 20, 5); // desfazer
    fill(255);
	 textAlign(CENTER, CENTER);
    text('↺', offsetX + larguraApp - 40, y + 20);

    c._y = y;
    y += 74;

	  textAlign(LEFT);
  }
}

function telaRelatorio() {

	// 🔥 FUNDO PRIMEIRO (IMPORTANTE)
  background('#f8f8fb');

	// 🔙 BOTÃO VOLTAR
fill('#ff69b4');
rect(offsetX + 20, 60, 100, 35, 10);

fill(255);
textSize(13);
textAlign(CENTER, CENTER);
text('← Voltar', offsetX + 70, 77);

textAlign(LEFT);

  // 🔥 ESCONDER TUDO
  buscaInput.hide();
  nomeInput.hide();
  valorSelect.hide();
  pagoCheckbox.hide();
  botaoAdicionar.hide();
  btnRelatorio.hide();
  iconePassaro.hide();
  btnMeta.hide();
  btnMenu.hide();
  btnAgenda.hide();

  nomeAgendaInput.hide();
  servicoAgendaSelect.hide();
  dataAgendaInput.hide();
  horaAgendaInput.hide();
  btnAddAgenda.hide();
  btnCancelar.hide();


  // 🔥 TÍTULO
  fill('#ff69b4');
  textSize(20 * escala);
  textStyle(BOLD);
  text('📊 Relatório Mensal', offsetX + 20, 40);

  // 🔥 FILTRO (POSIÇÃO CORRETA)
  filtroMes.show();
filtroMes.position(offsetX + 275 * escala, 100 * escala);

  // 🔥 SE NÃO ESCOLHEU MÊS
  if (mesSelecionado === null) {
    fill(120);
    textSize(14);
    text('Escolha um mês primeiro ☝🏻', offsetX + 220, 80);
    return;
  }

  let total = 0;
  let recebido = 0;
  let y = 150;
	
// 🔥 LIMITES DO SCROLL
let alturaLista = clientes.length * 60;
let alturaVisivel = height - 150;

let limite = alturaVisivel - alturaLista;
limite = min(0, limite);

scrollRelatorio = constrain(scrollRelatorio, limite, 0);

// 🔥 ATIVA SCROLL
push();

drawingContext.save();
drawingContext.beginPath();
drawingContext.rect(0, 130, width, height);
drawingContext.clip();

translate(0, scrollRelatorio);
	
  for (let c of clientes) {

    if (!c.data) continue;

    let data = new Date(c.data);
    let mes = data.getMonth();

    if (mes !== mesSelecionado) continue;

    total += c.valor;
    if (c.pago) recebido += c.valor;


    // 🧾 CARD
fill(255);
rect(offsetX + 20, y, larguraApp - 40, 50, 10);

// ===== NOME
textAlign(LEFT);
fill(0);
textSize(14);
text(c.nome, offsetX + 30, y + 18);

// ===== SERVIÇO
fill(120);
textSize(12);
text(c.servico, offsetX + 30, y + 35);

let colunaDireita = offsetX + larguraApp - 29;

// ===== DATA (direita)
textAlign(RIGHT);
fill(150);
textSize(11);
text(formatarDataBR(c.data), colunaDireita, y + 35);

// ===== VALOR (direita)
fill(c.pago ? '#2ecc71' : '#e74c3c');
textSize(13);
text(`R$ ${c.valor}`, colunaDireita, y + 20);

// 🔁 volta pro padrão
textAlign(LEFT);

    y += 60;
  }

	 // scroll termina
drawingContext.restore();
pop();

let pendente = total - recebido;


  // 💰 RESUMO
  fill(0);
  textSize(14);
  text(`Total: R$ ${total}`, offsetX + 20, 120);
  text(`Recebido: R$ ${recebido}`, offsetX + 160, 120);
  text(`Pendente: R$ ${pendente}`, offsetX + 320, 120);

}

function mousePressed() {
  tempoClique = millis();
}


function mouseReleased() {

  // 🔙 RELATÓRIO
  if (telaAtual === 'relatorio') {
    if (
      mouseX > offsetX + 20 &&
      mouseX < offsetX + 120 &&
      mouseY > 60 &&
      mouseY < 95
    ) {
      telaAtual = 'principal';
      return;
    }
  }

  // 🔥 AGENDA
  if (telaAtual === 'agenda') {

    // 🔙 VOLTAR
    if (
      mouseX > offsetX + 20 &&
      mouseX < offsetX + 140 &&
      mouseY > 60 &&
      mouseY < 110
    ) {
      telaAtual = 'principal';
      return;
    }

    // ✅ AGENDA DE HOJE
    if (mesSelecionado === null) {

      let hoje = formatarData(new Date());

      for (let i = 0; i < agendamentos.length; i++) {
        let a = agendamentos[i];

        if (a.data !== hoje) continue;
        if (a._yHoje === undefined) continue;

        let y = a._yHoje;
        let xCard = offsetX + 20;
        let larguraCard = larguraApp - 40;
        let yBtn = y - 15;

        // ✔ PAGAMENTO
        if (
          mouseX > xCard + larguraCard - 70 &&
          mouseX < xCard + larguraCard - 45 &&
          mouseY > yBtn &&
          mouseY < yBtn + 25
        ) {

          if (a.pago) return;

          a.pago = true;
          animandoPagamento[i] = 20;

          animacoesValor.push({
            x: xCard + larguraCard - 120,
            y: y,
            valor: a.valor,
            vida: 60
          });

          let nomeServico = a.servico;

          if (!isNaN(nomeServico)) {
            let mapaServicos = {
              25: 'Mão',
              35: 'Pé',
              50: 'Pé + Mão',
              130: 'Aplicação em Gel',
              165: 'Aplicação em Gel + Pé',
              100: 'Manut. Simples',
              135: 'Manut. Simples + Pé',
              110: 'Manut c/ Decoração',
              145: 'Manut c/ Decoração + Pé'
            };
            nomeServico = mapaServicos[nomeServico] || 'Serviço';
          }

          clientes.push({
            nome: a.nome,
            valor: parseFloat(a.valor),
            pago: true,
            servico: nomeServico,
            data: a.data,
            origem: 'agenda'
          });

          localStorage.setItem('clientes', JSON.stringify(clientes));
          localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

          return;
        }

        // ✏️ EDITAR
        if (
          mouseX > xCard + larguraCard - 40 &&
          mouseX < xCard + larguraCard - 15 &&
          mouseY > yBtn &&
          mouseY < yBtn + 25
        ) {
          editandoIndex = i;

          nomeAgendaInput.value(a.nome);
          servicoAgendaSelect.value(a.servico);
          dataAgendaInput.value(formatarParaInput(a.data));
          horaAgendaInput.value(a.hora);

          return;
        }
      }
    }

    // 🔵 EDITAR (com mês)
    if (mesSelecionado !== null) {
      for (let i = 0; i < agendamentos.length; i++) {

        if (agendamentos[i]._y === undefined) continue;
        let y = agendamentos[i]._y + scrollY;

        if (
          mouseX > offsetX + larguraApp - 90 &&
          mouseX < offsetX + larguraApp - 60 &&
          mouseY > y + 5 &&
          mouseY < y + 35
        ) {
          editandoIndex = i;

          let a = agendamentos[i];

          nomeAgendaInput.value(a.nome);
          servicoAgendaSelect.value(a.servico);
          dataAgendaInput.value(formatarParaInput(a.data));
          horaAgendaInput.value(a.hora);

          return;
        }
      }
    }

    // ❌ EXCLUIR AGENDAMENTO
    for (let i = 0; i < agendamentos.length; i++) {

      if (agendamentos[i]._y === undefined) continue;
      let y = agendamentos[i]._y + scrollY;

      if (
        mouseX > offsetX + larguraApp - 50 &&
        mouseX < offsetX + larguraApp - 20 &&
        mouseY > y + 5 &&
        mouseY < y + 35
      ) {

        if (confirm('Excluir agendamento?')) {
          agendamentos.splice(i, 1);
          localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        }

        return;
      }
    }

    return; // 🔥 MUITO IMPORTANTE
  }

  // 🔥 CLIENTES (AGORA CORRETO)
  if (mouseY < 410) return;

  for (let i = 0; i < listaFiltradaGlobal.length; i++) {
    let c = listaFiltradaGlobal[i];

    if (
      mouseX > offsetX + 20 &&
      mouseX < offsetX + larguraApp &&
      mouseY > c._y + scrollY &&
      mouseY < c._y + scrollY + 70
    ) {

      let x = offsetX + larguraApp - 25;
      let yBtn = c._y + scrollY + 10;

      // 🗑 EXCLUIR
      if (
        mouseX > x &&
        mouseX < x + 20 &&
        mouseY > yBtn &&
        mouseY < yBtn + 20
      ) {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
          let indexReal = clientes.indexOf(c);
          if (indexReal !== -1) clientes.splice(indexReal, 1);
          salvar();
        }
        return;
      }

      // ✔ PAGAR
      if (
        mouseX > offsetX + larguraApp - 110 &&
        mouseX < offsetX + larguraApp - 70 &&
        mouseY > c._y + scrollY &&
        mouseY < c._y + scrollY + 40
      ) {

        if (c.pago) return;

        c.pago = true;

        animandoPagamentoClientes[i] = 20;

        animacoesValor.push({
          x: offsetX + larguraApp - 150,
          y: c._y + scrollY + 20,
          valor: c.valor,
          vida: 60
        });

        salvar();
        return;
      }

      // ↺ DESFAZER
      if (
        mouseX > offsetX + larguraApp - 50 &&
        mouseX < offsetX + larguraApp - 30 &&
        mouseY > c._y + scrollY + 10 &&
        mouseY < c._y + scrollY + 30
      ) {
        c.pago = false;
        salvar();
        return;
      }
    }
  }
}
    
function formatarData(data) {
  if (typeof data === 'string') {
    // já está no formato yyyy-mm-dd (input)
    return data;
  }

  let d = new Date(data);

  let ano = d.getFullYear();
  let mes = String(d.getMonth() + 1).padStart(2, '0');
  let dia = String(d.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`; // ✅ padrão ISO
}
function formatarDataBR(data) {
  if (!data || typeof data !== 'string' || !data.includes('-')) {
    return '';
  }

  let partes = data.split('-');

  if (partes.length !== 3) return '';

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


function converterDataParaDate(data, hora) {
  return new Date(`${data}T${hora}`);
}

function formatarParaInput(data) {
  if (!data || typeof data !== 'string') return '';
  return data;
}

function adicionarCliente() {
  
  let nome = nomeInput.value().slice(0, 20);
  let valor = float(valorSelect.value()); 
  let servico = valorSelect.elt.options[valorSelect.elt.selectedIndex].text;
  let pago = pagoCheckbox.checked();

  if (nome !== '' && !isNaN(valor)) {
    let data = formatarData(new Date());

clientes.push({ nome, valor, pago, servico, data });

    nomeInput.value('');
    pagoCheckbox.checked(false);

    salvar();
  }
}
function desenharFogos() {
  for (let i = fogos.length - 1; i >= 0; i--) {
    let f = fogos[i];

    fill(f.cor[0], f.cor[1], f.cor[2], f.vida);
    noStroke();
    ellipse(f.x, f.y, 6);

    f.x += f.vx;
    f.y += f.vy;
    f.vida -= 5;

    if (f.vida <= 0) {
      fogos.splice(i, 1);
    }
  }
}

function soltarFogos() {
  for (let i = 0; i < 25; i++) {
    fogos.push({
      x: random(80, 340),
      y: random(120, 260),
      vx: random(-2, 2),
      vy: random(-2, 2),
      vida: 255,
      cor: [random(255), random(255), random(255)]
    });
  }
}

function adicionarAgendamento() {
  let nome = nomeAgendaInput.value();
let selectedOption = servicoAgendaSelect.elt.selectedOptions[0];

let servico = selectedOption ? selectedOption.text : '';
	let dataBruta = dataAgendaInput.value();
let data = formatarData(dataBruta);
  let hora = horaAgendaInput.value();
	
let valor = parseFloat(servicoAgendaSelect.value());
	if (nome && data && hora) {

		// 🔥 COLE AQUI 👇
    for (let i = 0; i < agendamentos.length; i++) {
      let a = agendamentos[i];

      if (i === editandoIndex) continue;

      if (a.data === data && a.hora === hora) {
        alert('⚠️ Já existe um cliente agendado nesse horário!');
        return;
      }
    }

    if (editandoIndex >= 0) {
      // 🔵 EDITANDO
      agendamentos[editandoIndex] = {
  nome,
  servico,
  valor,
  data,
  hora
};

      editandoIndex = -1;

    } else {
      
      // 🟢 NOVO
      agendamentos.push({
  nome,
  servico,
  valor,
  data,
  hora,
  pago: false // 👈 NOVO
});
		
		// 🔥 ORDENAR POR DATA E HORA
agendamentos.sort((a, b) => {
  let dataA = converterDataParaDate(a.data, a.hora);
  let dataB = converterDataParaDate(b.data, b.hora);

  return dataA - dataB;
});
		
    }

    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    nomeAgendaInput.value('');
    dataAgendaInput.value('');
    horaAgendaInput.value('');
  }
}
	

function touchStarted() {
  tempoClique = millis();
}

function touchEnded() {
  mouseReleased();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);

  larguraApp = window.innerWidth;
  offsetX = 0;
  escala = window.innerWidth / 420; // 👈 AQUI
}

function touchMoved() {

  if (telaAtual === 'relatorio') {
    scrollRelatorio -= (pmouseY - mouseY) * 0.8;
  } else {
    scrollY -= (pmouseY - mouseY) * 0.8;
  }

  return false;
}

function exportarBackup() {
  let dados = {
    clientes: clientes,
    agendamentos: agendamentos,
    metasPorMes: metasPorMes
  };

  saveJSON(dados, 'backup-manicure.json');
}

function importarBackup(file) {
  try {
    let dados = file.data;

    if (!dados || typeof dados !== 'object') {
      alert('Arquivo inválido!');
      return;
    }

    clientes = Array.isArray(dados.clientes) ? dados.clientes : [];
    agendamentos = Array.isArray(dados.agendamentos) ? dados.agendamentos : [];
    metasPorMes = dados.metasPorMes || {};

    salvar();
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    localStorage.setItem('metas', JSON.stringify(metasPorMes));

    alert('Backup restaurado com sucesso!');
  } catch (e) {
    alert('Erro ao importar backup!');
    console.error(e);
  }
}
