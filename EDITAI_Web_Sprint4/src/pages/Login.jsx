import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { usuario, entrar } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (usuario) return <Navigate to="/editor" replace />;

  function enviar(evento) {
    evento.preventDefault();
    if (entrar(email, senha)) navigate(location.state?.de === '/historico' ? '/historico' : '/editor', { replace: true });
    else setErro('E-mail ou senha incorretos. Confira as credenciais de demonstração abaixo.');
  }

  return <section className="wrap grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-24"><div><p className="eyebrow mb-5">Seu próximo olhar começa aqui</p><h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Entre no seu<br /><span className="text-mint">espaço de criação.</span></h1><p className="mt-6 max-w-md leading-relaxed text-slate-400">A mesma Nexa da Sprint 3, agora em uma experiência completa com editor, paletas e histórico.</p><p className="mt-6 max-w-md text-sm leading-relaxed text-slate-400">Acesso demonstrativo para avaliação acadêmica. Não utilize senhas pessoais. As fotos são processadas neste navegador.</p></div>
    <form onSubmit={enviar} className="panel w-full max-w-md space-y-5 p-7 sm:p-9"><h2 className="text-2xl font-semibold">Acessar assistente</h2><div><label htmlFor="email" className="mb-2 block text-sm">E-mail</label><input id="email" className="field" type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" /></div><div><label htmlFor="senha" className="mb-2 block text-sm">Senha</label><input id="senha" className="field" type="password" autoComplete="current-password" required value={senha} onChange={e => setSenha(e.target.value)} placeholder="Sua senha" /></div>{erro && <p role="alert" className="text-sm text-rose-300">{erro}</p>}<button className="primary w-full" type="submit">Entrar no EDITAI →</button><div className="border-t border-slate-700 pt-5 text-sm leading-relaxed text-slate-400"><p className="mb-2 font-semibold text-slate-200">Credenciais para teste</p><p>E-mail: <span className="text-mint">aluno@fiap.com.br</span></p><p>Senha: <span className="text-mint">1234</span></p></div></form>
  </section>;
}
