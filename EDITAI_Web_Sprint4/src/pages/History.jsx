import { useState } from 'react';
import { Link } from 'react-router-dom';
import useHistorico from '../hooks/useHistorico';
import { baixarArquivo } from '../services/edicao';

export default function History() {
  const { registros, erro, remover, apagarTudo, exportar } = useHistorico();
  const [confirmar, setConfirmar] = useState(false);
  const [aviso, setAviso] = useState('');
  const [busca, setBusca] = useState('');
  const visiveis = registros.filter(item => `${item.nome} ${item.estilo}`.toLowerCase().includes(busca.toLowerCase()));

  function exportarJSON() {
    const conteudo = exportar();
    if (conteudo === null) { setAviso('Não foi possível ler o histórico para exportação.'); return; }
    baixarArquivo(new Blob([conteudo], { type: 'application/json' }), 'editai-historico.json');
    setAviso('Download dos registros iniciado. O JSON contém miniaturas e parâmetros, não as fotos completas.');
  }

  return <section className="wrap py-10 sm:py-14"><div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow mb-3">Seu processo criativo</p><h1 className="text-4xl font-semibold">Histórico de edições</h1><p className="mt-4 max-w-xl leading-relaxed text-slate-400">Miniaturas e ajustes salvos neste navegador. Limite de 30 registros; suas fotos completas são guardadas pelo download no editor.</p></div><Link className="primary" to="/editor">Nova edição ↗</Link></div>
    <div className="panel mb-7 flex flex-wrap items-end gap-3 p-5"><div className="min-w-0 flex-1"><label className="mb-2 block text-sm" htmlFor="busca">Buscar por nome ou estilo</label><input id="busca" className="field" type="search" value={busca} onChange={e => setBusca(e.target.value)} placeholder="Ex.: minha_foto ou Quente" /></div><button className="secondary" onClick={exportarJSON}>Exportar JSON</button><button className="secondary" disabled={!registros.length && !erro} onClick={() => setConfirmar(true)}>Apagar histórico</button></div>
    {confirmar && <div role="alert" className="mb-6 rounded-xl border border-rose-500/50 p-5"><p className="mb-4">Apagar todos os registros deste navegador? Esta ação não pode ser desfeita.</p><div className="flex gap-3"><button className="secondary" onClick={() => { if (apagarTudo()) { setConfirmar(false); setAviso('Histórico apagado.'); } }}>Sim, apagar tudo</button><button className="primary" onClick={() => setConfirmar(false)}>Cancelar</button></div></div>}
    {erro && <p role="alert" className="mb-5 text-sm text-rose-300">{erro}</p>}
    {aviso && <p role="status" className="mb-5 text-sm text-mint">{aviso}</p>}
    <p className="mb-5 text-sm text-slate-400">{visiveis.length} de {registros.length} registros</p>
    {!visiveis.length ? <div className="panel px-6 py-16 text-center"><p className="text-2xl font-semibold">{registros.length ? 'Nenhum resultado para essa busca' : 'Seu próximo olhar começa no editor'}</p><p className="mx-auto mb-6 mt-3 max-w-md text-slate-400">{registros.length ? 'Tente outro nome ou estilo.' : 'Escolha uma foto, experimente um estilo e salve sua primeira edição.'}</p><Link className="primary" to="/editor">Ir para o editor →</Link></div> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visiveis.map(item => <article key={item.id} className="panel overflow-hidden"><img src={item.miniatura} alt={`Miniatura da edição ${item.nome}`} className="aspect-[4/3] w-full object-cover" /><div className="p-5"><div className="mb-3 flex items-start justify-between gap-2"><h2 className="break-all text-lg font-semibold">{item.nome}</h2><span className="shrink-0 rounded-full bg-teal-400/10 px-2 py-1 text-xs text-mint">{item.estilo}</span></div><p className="text-xs text-slate-400">{new Date(item.data).toLocaleString('pt-BR')}</p><details className="mt-4 text-sm"><summary className="cursor-pointer text-slate-300">Ver parâmetros</summary><ul className="mt-3 space-y-1 text-slate-400">{Object.entries(item.ajustes || {}).map(([campo, valor]) => <li key={campo}>{campo}: {valor}</li>)}{item.tonalidade && <li>Tonalidade: {item.tonalidade}</li>}</ul></details><button aria-label={`Excluir ${item.nome}`} className="mt-5 text-sm text-rose-300 underline underline-offset-4" onClick={() => remover(item.id)}>Excluir registro</button></div></article>)}</div>}
  </section>;
}
