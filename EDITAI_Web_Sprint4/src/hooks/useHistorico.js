import { useState } from 'react';

const CHAVE = 'editai-historico-v4';

function lerHistorico() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (!salvo) return { registros: [], erro: '' };
    const registros = JSON.parse(salvo);
    if (!Array.isArray(registros) || registros.some(item => typeof item.id !== 'string' || typeof item.nome !== 'string' || typeof item.estilo !== 'string' || typeof item.data !== 'string' || !item.miniatura?.startsWith('data:image/jpeg;base64,'))) {
      return { registros: [], erro: 'O histórico salvo está inválido. Os dados foram preservados. Exporte o conteúdo para recuperação antes de usar a opção de apagar.' };
    }
    return { registros, erro: '' };
  } catch {
    return { registros: [], erro: 'Não foi possível ler o histórico. Verifique as permissões de armazenamento do navegador; os dados existentes não foram substituídos.' };
  }
}

export default function useHistorico() {
  const [estado, setEstado] = useState(lerHistorico);

  function gravar(registros) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(registros));
      setEstado({ registros, erro: '' });
      return true;
    } catch {
      setEstado(anterior => ({ ...anterior, erro: 'Não foi possível salvar. O armazenamento pode estar cheio ou bloqueado. Baixe a foto e tente liberar espaço.' }));
      return false;
    }
  }

  function adicionar(registro) {
    // Não substitui silenciosamente um histórico que não pôde ser lido.
    const atual = lerHistorico();
    if (atual.erro) { setEstado(atual); return false; }
    if (atual.registros.length >= 30) {
      setEstado({ ...atual, erro: 'Limite de 30 registros atingido. Exclua um item no histórico antes de salvar outro.' });
      return false;
    }
    return gravar([registro, ...atual.registros]);
  }

  function remover(id) { return gravar(estado.registros.filter(item => item.id !== id)); }
  function apagarTudo() {
    try { localStorage.removeItem(CHAVE); setEstado({ registros: [], erro: '' }); return true; }
    catch { setEstado(anterior => ({ ...anterior, erro: 'O navegador não permitiu apagar o histórico.' })); return false; }
  }

  function exportar() {
    try { return localStorage.getItem(CHAVE) || '[]'; }
    catch { return null; }
  }

  return { ...estado, adicionar, remover, apagarTudo, exportar };
}
