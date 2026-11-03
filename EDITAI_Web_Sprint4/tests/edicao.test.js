import test from 'node:test';
import assert from 'node:assert/strict';
import { ESTILOS, PADRAO, montarFiltro, interpretarPedido, nomeSeguro } from '../src/services/edicao.js';
import { consultarPaleta } from '../src/services/paleta.js';

test('os quatro estilos da Sprint 3 foram preservados', () => {
  for (const nome of ['Vibrante', 'Sombrio', 'Quente', 'Esverdeado']) assert.ok(ESTILOS.find(item => item.nome === nome));
});
test('configuração original é neutra', () => {
  assert.equal(PADRAO.brilho, 100);
  assert.equal(PADRAO.contraste, 100);
  assert.equal(PADRAO.saturacao, 100);
  assert.equal(PADRAO.cinza, 0);
});
test('pedido reconhece acentos e pontuação', () => {
  assert.equal(interpretarPedido('Quero algo esverdeado!').nome, 'Esverdeado');
  assert.equal(interpretarPedido('No metrô').nome, 'Esverdeado');
});
test('não confunde palavras contidas em outras', () => assert.equal(interpretarPedido('pessoa sorrindo'), null));
test('pedidos desconhecidos não selecionam um perfil', () => assert.equal(interpretarPedido('xyz'), null));
test('pedido pode selecionar preto e branco', () => assert.equal(interpretarPedido('preto e branco').ajustes.cinza, 100));
test('filtro contém todos os seis ajustes', () => {
  const filtro = montarFiltro({ ...PADRAO, brilho: 65, matiz: -10 });
  assert.match(filtro, /brightness\(65%\)/);
  assert.match(filtro, /hue-rotate\(-10deg\)/);
  assert.match(filtro, /grayscale\(0%\)/);
});
test('nome de download remove extensão e caracteres problemáticos', () => {
  assert.equal(nomeSeguro(' minha foto.png '), 'minha_foto');
  assert.equal(nomeSeguro(''), 'foto_editai');
  assert.ok(nomeSeguro('a'.repeat(100)).length <= 60);
});
test('API recusa cor inválida antes da requisição', async () => {
  await assert.rejects(consultarPaleta('azul'), /inválida/);
});
test('API consome a URL de paleta e valida o retorno', async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async (url) => {
    assert.match(url, /https:\/\/www.thecolorapi.com\/scheme\?hex=336699/);
    return { ok: true, json: async () => ({ colors: ['#112233', '#445566', '#778899'].map(hex => ({ hex: { value: hex }, name: { value: 'Cor' } })) }) };
  };
  const cores = await consultarPaleta('336699');
  assert.equal(cores.length, 3);
  assert.equal(cores[0].hex, '#112233');
});
test('API rejeita falha HTTP', async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => ({ ok: false, status: 503 });
  await assert.rejects(consultarPaleta('336699'), /503/);
});
test('API rejeita estrutura ou cores inválidas', async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ colors: [] }) });
  await assert.rejects(consultarPaleta('336699'), /inválida/);
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ colors: Array(3).fill({ hex: { value: 'incorreta' }, name: { value: 'Cor' } }) }) });
  await assert.rejects(consultarPaleta('336699'), /inválida/);
});
