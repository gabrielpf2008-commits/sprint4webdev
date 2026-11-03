import { useEffect, useRef, useState } from 'react';
import { consultarPaleta } from '../services/paleta';

export default function usePaleta() {
  const [cores, setCores] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const controle = useRef(null);
  useEffect(() => () => controle.current?.abort(), []);

  function limpar() {
    controle.current?.abort();
    controle.current = null;
    setCores([]);
    setErro('');
    setCarregando(false);
  }

  async function buscar(cor) {
    controle.current?.abort();
    const atual = new AbortController();
    controle.current = atual;
    const tempo = setTimeout(() => atual.abort(), 8000);
    setCarregando(true);
    setErro('');
    setCores([]);
    try {
      const resultado = await consultarPaleta(cor, atual.signal);
      if (controle.current === atual) setCores(resultado);
    } catch (erro) {
      if (controle.current === atual) setErro(erro.name === 'AbortError' ? 'A consulta demorou demais. Tente novamente.' : 'Não foi possível consultar a paleta. Verifique a conexão e tente novamente.');
    } finally {
      clearTimeout(tempo);
      if (controle.current === atual) setCarregando(false);
    }
  }
  return { cores, carregando, erro, buscar, limpar };
}
