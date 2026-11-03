import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try { return sessionStorage.getItem('editai-sessao') === 'aluno@fiap.com.br' ? 'aluno@fiap.com.br' : null; }
    catch { return null; }
  });
  const [erroSessao, setErroSessao] = useState('');

  function entrar(email, senha) {
    if (email.trim().toLowerCase() !== 'aluno@fiap.com.br' || senha !== '1234') return false;
    try { sessionStorage.setItem('editai-sessao', 'aluno@fiap.com.br'); }
    catch { setErroSessao('Sessão ativa somente até atualizar a página; o navegador bloqueou o armazenamento.'); }
    setUsuario('aluno@fiap.com.br');
    return true;
  }

  function sair() {
    try { sessionStorage.removeItem('editai-sessao'); } catch { /* A sessão em memória também é encerrada. */ }
    setUsuario(null);
    setErroSessao('');
  }

  return <AuthContext.Provider value={{ usuario, entrar, sair, erroSessao }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
