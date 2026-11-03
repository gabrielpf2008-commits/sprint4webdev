export default function StyleButton({ perfil, selecionado, onEscolher, disabled }) {
  return <button type="button" disabled={disabled} aria-pressed={selecionado} onClick={() => onEscolher(perfil)} className={`rounded-xl border px-3 py-3 text-left transition ${selecionado ? 'border-mint bg-teal-400/10' : 'border-slate-700 hover:border-slate-400'}`}><span className="block text-sm font-semibold">{perfil.nome}</span><span className="mt-1 block text-xs text-slate-400">{perfil.descricao}</span></button>;
}
