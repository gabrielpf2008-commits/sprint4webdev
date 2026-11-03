import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const { usuario, sair } = useAuth();
  const estiloLink = ({ isActive }) => `rounded px-2 py-2 text-sm ${isActive ? 'text-mint' : 'text-slate-300 hover:text-white'}`;

  return <header className="sticky top-0 z-30 border-b border-slate-700/60 bg-ink/95 backdrop-blur">
    <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-mint focus:p-3 focus:text-ink">Ir para o conteúdo</a>
    <div className="wrap flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
      <Link to="/" className="flex items-center gap-3" onClick={() => setAberto(false)} aria-label="EDITAI início">
        <span className="grid h-9 w-9 place-items-center rounded-lg border border-teal-400/50 text-xl font-bold text-mint">E<span className="sr-only">DITAI</span></span>
        <span className="text-xl font-bold tracking-tight">EDITAI<span className="ml-2 hidden text-xs font-normal text-slate-400 sm:inline">com Nexa</span></span>
      </Link>
      <button type="button" aria-expanded={aberto} aria-controls="navegacao" className="secondary md:hidden" onClick={() => setAberto(!aberto)}>{aberto ? 'Fechar menu' : 'Menu'}</button>
      <nav id="navegacao" aria-label="Principal" className={`${aberto ? 'flex' : 'hidden'} w-full flex-col gap-2 md:flex md:w-auto md:flex-row md:items-center md:gap-5`} onClick={() => setAberto(false)}>
        <NavLink to="/" end className={estiloLink}>Início</NavLink>
        <NavLink to="/editor" className={estiloLink}>Editor</NavLink>
        <NavLink to="/historico" className={estiloLink}>Histórico</NavLink>
        {usuario ? <button className="secondary" onClick={sair}>Sair</button> : <Link className="primary" to="/login">Acessar assistente <span aria-hidden="true">↗</span></Link>}
      </nav>
    </div>
  </header>;
}
