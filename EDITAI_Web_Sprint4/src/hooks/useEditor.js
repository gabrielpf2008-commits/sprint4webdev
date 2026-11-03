import { useEffect, useRef, useState } from 'react';
import { ESTILOS, montarFiltro, PADRAO } from '../services/edicao';

export const FOTOS = ['/assets/paisagem-1.jpg', '/assets/paisagem-2.jpg', '/assets/paisagem-3.jpg'];

export default function useEditor() {
  const [indice, setIndice] = useState(0);
  const [origem, setOrigem] = useState(FOTOS[0]);
  const [imagem, setImagem] = useState(null);
  const [ajustes, setAjustes] = useState({ ...PADRAO });
  const [estilo, setEstilo] = useState('Original');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [corMedia, setCorMedia] = useState('336699');
  const [tonalidade, setTonalidade] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    let cancelado = false;
    const foto = new Image();
    setCarregando(true);
    setImagem(null);
    setErro('');
    foto.onload = () => {
      if (cancelado) return;
      if (foto.naturalWidth * foto.naturalHeight > 24000000) {
        setErro('A imagem ultrapassa 24 megapixels. Escolha uma foto menor.');
        setCarregando(false);
        return;
      }
      setImagem(foto);
      const amostra = document.createElement('canvas');
      amostra.width = 32; amostra.height = 32;
      const ctx = amostra.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 32, 32);
      ctx.drawImage(foto, 0, 0, 32, 32);
      const pixels = ctx.getImageData(0, 0, 32, 32).data;
      const soma = [0, 0, 0];
      for (let i = 0; i < pixels.length; i += 4) for (let c = 0; c < 3; c++) soma[c] += pixels[i + c];
      setCorMedia(soma.map(c => Math.round(c / 1024).toString(16).padStart(2, '0')).join(''));
      setCarregando(false);
    };
    foto.onerror = () => { if (!cancelado) { setErro('Não foi possível abrir a imagem. Use um arquivo JPG, PNG ou WebP válido.'); setCarregando(false); } };
    foto.src = origem;
    return () => { cancelado = true; if (origem.startsWith('blob:')) URL.revokeObjectURL(origem); };
  }, [origem]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!imagem) { canvas.width = 1; canvas.height = 1; return; }
    const escala = Math.min(1, 2000 / Math.max(imagem.naturalWidth, imagem.naturalHeight));
    canvas.width = Math.round(imagem.naturalWidth * escala);
    canvas.height = Math.round(imagem.naturalHeight * escala);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.filter = montarFiltro(ajustes);
    ctx.drawImage(imagem, 0, 0, canvas.width, canvas.height);
    ctx.filter = 'none';
    if (tonalidade) { ctx.fillStyle = tonalidade; ctx.globalAlpha = .15; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.globalAlpha = 1; }
  }, [imagem, ajustes, tonalidade]);

  function selecionarEstilo(perfil) { setAjustes({ ...perfil.ajustes }); setEstilo(perfil.nome); setTonalidade(''); }
  function ajustar(campo, valor) { setAjustes(anterior => ({ ...anterior, [campo]: Number(valor) })); setEstilo('Manual'); }
  function trocarFoto(passo) {
    const proximo = (indice + passo + FOTOS.length) % FOTOS.length;
    setIndice(proximo); setOrigem(FOTOS[proximo]); selecionarEstilo(ESTILOS[0]);
  }
  function importar(arquivo) {
    if (!arquivo) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(arquivo.type)) { setErro('Selecione uma imagem JPG, PNG ou WebP.'); return; }
    if (arquivo.size > 12 * 1024 * 1024) { setErro('O arquivo deve ter no máximo 12 MB.'); return; }
    setOrigem(URL.createObjectURL(arquivo)); selecionarEstilo(ESTILOS[0]);
  }
  function miniatura() {
    const canvas = canvasRef.current;
    const menor = document.createElement('canvas');
    const escala = Math.min(1, 360 / canvas.width);
    menor.width = Math.round(canvas.width * escala); menor.height = Math.round(canvas.height * escala);
    menor.getContext('2d').drawImage(canvas, 0, 0, menor.width, menor.height);
    return menor.toDataURL('image/jpeg', .7);
  }

  return { origem, ajustes, estilo, carregando, erro, corMedia, tonalidade, setTonalidade,
    canvasRef, selecionarEstilo, ajustar, trocarFoto, importar, miniatura, pronto: !!imagem && !carregando };
}
