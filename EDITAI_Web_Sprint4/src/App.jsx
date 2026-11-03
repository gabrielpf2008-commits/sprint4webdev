import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Editor from './pages/Editor';
import History from './pages/History';

export default function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
    const titulos = { '/': 'Sua intenção em imagem', '/login': 'Entrar', '/editor': 'Editor Nexa', '/historico': 'Histórico' };
    document.title = `${titulos[pathname] || 'Página não encontrada'} | EDITAI`;
  }, [pathname, hash]);

  return <div className="flex min-h-screen flex-col"><Header /><main id="conteudo" className="flex-1"><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/editor" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
    <Route path="/historico" element={<ProtectedRoute><History /></ProtectedRoute>} />
    <Route path="*" element={<div className="wrap py-24"><p className="eyebrow">404</p><h1 className="my-5 text-4xl">Página não encontrada</h1><Link className="primary" to="/">Voltar ao início</Link></div>} />
  </Routes></main><Footer /></div>;
}
