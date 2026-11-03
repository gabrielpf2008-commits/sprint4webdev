// Regras simples: os quatro estilos já existiam na galeria da Sprint 3.
export const PADRAO = { brilho: 100, contraste: 100, saturacao: 100, sepia: 0, matiz: 0, cinza: 0 };
export const ESTILOS = [
  { nome: 'Original', descricao: 'Ponto de partida', ajustes: { ...PADRAO } },
  { nome: 'Vibrante', descricao: 'Cores mais intensas', ajustes: { ...PADRAO, saturacao: 180, contraste: 110 } },
  { nome: 'Sombrio', descricao: 'Luz baixa e drama', ajustes: { ...PADRAO, brilho: 65, cinza: 35, contraste: 120 } },
  { nome: 'Quente', descricao: 'Tons dourados', ajustes: { ...PADRAO, sepia: 45, saturacao: 140, matiz: -10 } },
  { nome: 'Esverdeado', descricao: 'Atmosfera urbana', ajustes: { ...PADRAO, matiz: 65, saturacao: 115 } },
  { nome: 'Preto e branco', descricao: 'Luz e contraste', ajustes: { ...PADRAO, cinza: 100, contraste: 120 } },
];

export function montarFiltro(ajustes) {
  return `brightness(${ajustes.brilho}%) contrast(${ajustes.contraste}%) saturate(${ajustes.saturacao}%) sepia(${ajustes.sepia}%) hue-rotate(${ajustes.matiz}deg) grayscale(${ajustes.cinza}%)`;
}

export function interpretarPedido(pedido) {
  const normalizado = pedido.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const texto = ' ' + normalizado.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  const regras = [
    ['Preto e branco', ['preto e branco', 'pb', 'cinza']],
    ['Vibrante', ['vibrante', 'colorido', 'instagram']],
    ['Sombrio', ['sombrio', 'escuro', 'cinema', 'filme']],
    ['Quente', ['quente', 'sol', 'dourado', 'entardecer']],
    ['Esverdeado', ['esverdeado', 'verde', 'coringa', 'metro']],
    ['Original', ['original', 'natural', 'neutro']],
  ];
  for (const [nome, palavras] of regras) {
    if (palavras.some(palavra => texto.includes(' ' + palavra + ' '))) return ESTILOS.find(estilo => estilo.nome === nome);
  }
  return null;
}

export function nomeSeguro(nome) {
  return nome.trim().replace(/\.[^.]+$/, '').replace(/[^\p{L}\p{N}_-]+/gu, '_').slice(0, 60) || 'foto_editai';
}

export function baixarArquivo(conteudo, nome) {
  const url = URL.createObjectURL(conteudo);
  const link = document.createElement('a');
  link.href = url;
  link.download = nome;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
