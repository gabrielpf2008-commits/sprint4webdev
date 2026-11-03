import { useState } from 'react';
import { Link } from 'react-router-dom';
import useEditor from '../hooks/useEditor';
import useHistorico from '../hooks/useHistorico';
import usePaleta from '../hooks/usePaleta';
import { useAuth } from '../context/AuthContext';
import { baixarArquivo, ESTILOS, interpretarPedido, nomeSeguro } from '../services/edicao';
import Slider from '../components/Slider';
import StyleButton from '../components/StyleButton';

export default function Editor() {
  const editor = useEditor();
  const historico = useHistorico();
  const paleta = usePaleta();
  const { erroSessao } = useAuth();
  const [pedido, setPedido] = useState('');
  const [nome, setNome] = useState('minha_foto_editada');
  const [mensagem, setMensagem] = useState('');
  const [verAntes, setVerAntes] = useState(false);

  function aplicarPedido(evento) {
    evento.preventDefault();
    const perfil = interpretarPedido(pedido);
    if (!perfil) { setMensagem('Não reconheci esse pedido. Tente vibrante, sombrio, quente, verde ou preto e branco. Os ajustes foram mantidos.'); return; }
    editor.selecionarEstilo(perfil);
    setMensagem(`Nexa selecionou ${perfil.nome} pelas palavras do pedido. Você pode refinar os ajustes abaixo.`);
  }

  function salvar() {
    if (!nome.trim()) { setMensagem('Dê um nome à edição antes de salvar.'); return; }
    const registro = { id: crypto.randomUUID(), nome: nomeSeguro(nome), data: new Date().toISOString(),
      estilo: editor.estilo, ajustes: { ...editor.ajustes }, tonalidade: editor.tonalidade,
      miniatura: editor.miniatura(), pedido };
    if (historico.adicionar(registro)) setMensagem('Edição registrada no histórico local. Para guardar a foto completa, use Baixar PNG.');
  }

  function baixar() {
    editor.canvasRef.current.toBlob(blob => {
      if (blob) { baixarArquivo(blob, `${nomeSeguro(nome)}.png`); setMensagem('O download da imagem PNG foi iniciado.'); }
      else setMensagem('Não foi possível gerar o PNG. Tente novamente.');
    }, 'image/png');
  }

  function trocar(passo) { editor.trocarFoto(passo); paleta.limpar(); setMensagem(''); setVerAntes(false); }

  return <div className="wrap py-9 sm:py-12">
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow mb-2">Seu espaço de criação</p><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Editor Nexa<span className="text-mint">.</span></h1></div><Link to="/historico" className="secondary">Ver histórico →</Link></div>
    {erroSessao && <p role="status" className="mb-4 text-sm text-amber-200">{erroSessao}</p>}
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-5">
        <section className="panel overflow-hidden" aria-label="Visualização da imagem">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 p-4"><span className="text-sm text-slate-300">{verAntes ? 'Original' : 'Resultado'} <span className="text-slate-500">/</span> {editor.estilo}</span><div className="flex gap-2"><button className="secondary" disabled={editor.carregando} onClick={() => trocar(-1)} aria-label="Foto anterior">←</button><button className="secondary" disabled={editor.carregando} onClick={() => trocar(1)} aria-label="Próxima foto">→</button></div></div>
          <div className="relative flex min-h-56 items-center justify-center bg-[#070b12] p-3 sm:min-h-80 sm:p-6">
            <canvas ref={editor.canvasRef} aria-label="Foto com os ajustes aplicados" className={`${verAntes || !editor.pronto ? 'hidden' : 'block'} max-h-[580px] max-w-full object-contain`} />
            {verAntes && editor.pronto && <img src={editor.origem} className="max-h-[580px] max-w-full object-contain" alt="Foto original para comparação" />}
            {editor.carregando && <p role="status" className="py-24 text-slate-400">Abrindo imagem…</p>}
            {!editor.pronto && !editor.carregando && <p className="max-w-sm py-16 text-center text-slate-400">Escolha outra foto de exemplo ou importe um arquivo válido.</p>}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-700 p-4"><button type="button" className="secondary" aria-pressed={verAntes} disabled={!editor.pronto} onClick={() => setVerAntes(!verAntes)}>{verAntes ? 'Ver resultado' : 'Comparar com original'}</button><label className="secondary cursor-pointer">Importar foto<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={evento => { editor.importar(evento.target.files[0]); paleta.limpar(); setMensagem(''); evento.target.value = ''; }} /></label></div>
        </section>
        {editor.erro && <p role="alert" className="text-sm text-rose-300">{editor.erro}</p>}
        <p className="text-xs leading-relaxed text-slate-400">JPG, PNG ou WebP · Até 12 MB e 24 MP · Exportação com até 2000 px no maior lado. As fotos ficam no navegador.</p>
        <section className="panel p-5 sm:p-6"><div className="mb-5 flex items-start justify-between gap-3"><div><h2 className="text-lg font-semibold">Nexa, encontre meu estilo</h2><p className="mt-1 text-sm text-slate-400">Descreva uma intenção ou escolha um dos estilos.</p></div><span className="rounded-full bg-teal-400/10 px-3 py-1 text-xs text-mint">Regras locais</span></div>
          <form className="mb-5 flex flex-col gap-3 sm:flex-row" onSubmit={aplicarPedido}><label htmlFor="pedido" className="sr-only">Sua intenção estética</label><input id="pedido" className="field" required maxLength={300} placeholder="Ex.: quero um visual quente" value={pedido} onChange={e => setPedido(e.target.value)} /><button className="primary shrink-0" disabled={!editor.pronto}>Aplicar pedido</button></form>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{ESTILOS.map(perfil => <StyleButton key={perfil.nome} perfil={perfil} selecionado={editor.estilo === perfil.nome} onEscolher={editor.selecionarEstilo} disabled={!editor.pronto} />)}</div>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">A Nexa reconhece palavras, sem IA generativa. Não interpreta negações; use um pedido direto, como “quente”.</p>
        </section>
      </div>
      <aside className="min-w-0 space-y-5" aria-label="Controles da edição">
        <section className="panel space-y-5 p-5"><div className="flex items-center justify-between gap-2"><h2 className="text-lg font-semibold">Ajustes manuais</h2><button disabled={!editor.pronto} className="text-xs text-mint underline underline-offset-4" onClick={() => editor.selecionarEstilo(ESTILOS[0])}>Restaurar</button></div>
          <Slider nome="Iluminação" campo="brilho" valor={editor.ajustes.brilho} onAlterar={editor.ajustar} disabled={!editor.pronto} />
          <Slider nome="Contraste" campo="contraste" valor={editor.ajustes.contraste} onAlterar={editor.ajustar} disabled={!editor.pronto} />
          <Slider nome="Saturação" campo="saturacao" valor={editor.ajustes.saturacao} onAlterar={editor.ajustar} disabled={!editor.pronto} />
          <Slider nome="Tons quentes" campo="sepia" valor={editor.ajustes.sepia} maximo={100} onAlterar={editor.ajustar} disabled={!editor.pronto} />
          <Slider nome="Matiz" campo="matiz" valor={editor.ajustes.matiz} minimo={-180} maximo={180} onAlterar={editor.ajustar} disabled={!editor.pronto} />
          <Slider nome="Preto e branco" campo="cinza" valor={editor.ajustes.cinza} maximo={100} onAlterar={editor.ajustar} disabled={!editor.pronto} />
        </section>
        <section className="panel p-5"><p className="eyebrow mb-2">The Color API</p><h2 className="mb-2 text-lg font-semibold">Uma paleta para explorar</h2><p className="mb-4 text-sm leading-relaxed text-slate-400">Busque três cores a partir da cor média da foto original. Toque em uma para adicionar uma tonalidade suave.</p><button className="secondary w-full" disabled={!editor.pronto || paleta.carregando} onClick={() => paleta.buscar(editor.corMedia)}>{paleta.carregando ? 'Consultando paleta…' : 'Consultar paleta online'}</button>
          {paleta.erro && <p role="alert" className="mt-3 text-sm text-rose-300">{paleta.erro}</p>}
          <div className="mt-4 flex flex-wrap gap-2">{paleta.cores.map(cor => <button key={cor.hex} disabled={!editor.pronto} onClick={() => editor.setTonalidade(cor.hex)} aria-pressed={editor.tonalidade === cor.hex} aria-label={`Aplicar tonalidade ${cor.hex}`} className="flex flex-1 flex-col items-center gap-2 rounded-lg border border-slate-600 p-2 text-xs"><span className="h-9 w-full rounded" style={{ backgroundColor: cor.hex }} /><span>{cor.hex}</span></button>)}</div>
          {editor.tonalidade && <button className="mt-3 text-xs text-mint underline" onClick={() => editor.setTonalidade('')}>Remover tonalidade {editor.tonalidade}</button>}
        </section>
        <section className="panel p-5"><h2 className="mb-4 text-lg font-semibold">Guarde seu resultado</h2><label className="mb-2 block text-sm" htmlFor="nome-foto">Nome da edição</label><input id="nome-foto" className="field mb-4" maxLength={60} value={nome} onChange={e => setNome(e.target.value)} /><div className="grid gap-3"><button disabled={!editor.pronto} className="primary" onClick={baixar}>Baixar PNG ↓</button><button disabled={!editor.pronto} className="secondary" onClick={salvar}>Salvar no histórico</button></div><p className="mt-3 text-xs leading-relaxed text-slate-400">O histórico guarda uma miniatura e os parâmetros neste navegador. Baixe o PNG para guardar a imagem completa.</p></section>
      </aside>
    </div>
    <div className="mt-5 space-y-2" aria-live="polite">{mensagem && <p role="status" className="rounded-xl border border-teal-500/40 bg-teal-500/5 p-4 text-sm text-mint">{mensagem}</p>}{historico.erro && <p role="alert" className="text-sm text-rose-300">{historico.erro}</p>}</div>
  </div>;
}
