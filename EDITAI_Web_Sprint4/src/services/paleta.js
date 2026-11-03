export async function consultarPaleta(cor, signal) {
  if (!/^[\da-f]{6}$/i.test(cor)) throw new Error('Cor de origem inválida.');
  const resposta = await fetch(`https://www.thecolorapi.com/scheme?hex=${cor}&mode=complement&count=3`, { signal });
  if (!resposta.ok) throw new Error(`O serviço de cores retornou erro ${resposta.status}.`);
  const dados = await resposta.json();
  if (!Array.isArray(dados.colors) || dados.colors.length !== 3) throw new Error('A API retornou uma paleta inválida.');
  return dados.colors.map(item => {
    if (!/^#[\da-f]{6}$/i.test(item.hex?.value) || typeof item.name?.value !== 'string') throw new Error('A API retornou uma cor inválida.');
    return { hex: item.hex.value, nome: item.name.value };
  });
}
