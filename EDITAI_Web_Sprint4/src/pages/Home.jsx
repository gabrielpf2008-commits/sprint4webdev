import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';

const equipe = [
  ['Felipe Santos', '572382', 'Front-end'], ['Gabriel Pereira', '569222', 'Front-end e back-end'],
  ['João Leão', '569864', 'Back-end'], ['Thomaz Vitorino', '572801', 'Pesquisa e validação'], ['Yago Hideo', '569859', 'Front-end e design']
];

export default function Home() {
  return <>
    <section id="solucao" className="wrap grid items-center gap-12 py-14 md:py-24 lg:grid-cols-[1.15fr_1fr]">
      <div><p className="eyebrow mb-6 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-mint" /> Sua criatividade encontra o controle</p>
        <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">Você imagina.<br />A imagem<br /><span className="text-mint">ganha intenção.</span></h1>
        <p className="mt-7 max-w-lg text-lg leading-relaxed text-slate-400">A Nexa aproxima o que você quer dos ajustes da sua foto. Explore estilos, refine os detalhes e crie do seu jeito no EDITAI.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link className="primary" to="/editor">Experimentar o editor <span aria-hidden="true">↗</span></Link><a className="secondary" href="#sobre">Conhecer o projeto</a></div>
        <p className="mt-6 text-xs text-slate-400">Protótipo acadêmico · Edição no navegador · Sem enviar suas fotos</p>
      </div>
      <div className="relative mx-auto w-full max-w-md rounded-3xl border border-slate-700 bg-panel p-6 sm:p-9">
        <div className="mb-7 flex items-center justify-between"><img src="/assets/nexa.png" alt="Nexa" className="h-7 w-auto" /><span className="rounded-full bg-teal-400/10 px-3 py-1 text-xs text-mint">Assistente de imagem</span></div>
        <div className="flex items-center justify-center gap-5"><img src="/assets/prototipo-1.png" alt="Protótipo original da Nexa com paisagem e opções de estilo" className="w-[52%] max-w-48 rounded-2xl shadow-2xl" /><div className="space-y-6"><div><span className="text-xs text-slate-400">01 / EXPRESSE</span><p className="mt-2 text-sm">Sua intenção</p></div><div><span className="text-xs text-slate-400">02 / EXPLORE</span><p className="mt-2 text-sm">Seu estilo</p></div><div><span className="text-xs text-slate-400">03 / REFINE</span><p className="mt-2 text-sm">Seu olhar</p></div></div></div>
        <p className="mt-7 border-t border-slate-700 pt-4 text-xs text-slate-400">Do conceito da Sprint 3 à experiência interativa.</p>
      </div>
    </section>
    <div className="border-y border-slate-800"><nav className="wrap flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm text-slate-300" aria-label="Seções da apresentação"><a href="#publico-alvo">Público-alvo</a><a href="#sobre">Sobre o projeto</a><a href="#galeria">Galeria original</a><a href="#equipe">Nossa equipe</a></nav></div>
    <section id="publico-alvo" className="wrap py-20"><SectionTitle numero="01" titulo="Menos barreiras. Mais expressão." texto="Para quem sabe o que deseja transmitir, mas quer ajuda para chegar aos ajustes certos." />
      <div className="grid gap-5 md:grid-cols-3">{[
        ['01', 'Quem está começando', 'Explore iluminação, contraste e saturação sem precisar conhecer um editor profissional.'],
        ['02', 'Criadores de conteúdo', 'Experimente combinações de estilo e mantenha referências no seu histórico local.'],
        ['03', 'Fotógrafos e estudantes', 'Use a sugestão como ponto de partida e refine os parâmetros com controle manual.']
      ].map(([n, titulo, texto]) => <article key={n} className="panel p-7"><span className="text-sm text-mint">{n}</span><h3 className="mb-3 mt-7 text-xl font-semibold">{titulo}</h3><p className="leading-relaxed text-slate-400">{texto}</p></article>)}</div>
    </section>
    <section id="sobre" className="border-y border-slate-800 bg-panel/50"><div className="wrap grid gap-10 py-20 md:grid-cols-2"><SectionTitle numero="02" titulo="O mesmo projeto. Um novo passo." /><div className="space-y-5 leading-relaxed text-slate-300"><p>O EDITAI nasceu da proposta JOVI/Nexa: traduzir uma intenção estética em parâmetros de tratamento fotográfico. A Nexa é a assistente; o EDITAI reúne a experiência de edição.</p><p>Nesta Sprint, a landing page e o assistente da Sprint 3 passam a fazer parte da mesma aplicação React. Os estilos Vibrante, Sombrio, Quente e Esverdeado continuam aqui, agora acompanhados de ajustes manuais, comparação e histórico.</p><p>Este protótipo usa regras locais de interpretação. Ele não utiliza um modelo de IA generativa nem faz análise profissional da cena. Você acompanha os ajustes e decide o resultado.</p><Link className="secondary" to="/editor">Abrir o assistente →</Link></div></div></section>
    <section id="galeria" className="wrap py-20"><SectionTitle numero="03" titulo="De onde partimos" texto="As telas concebidas na Sprint 3, preservadas como parte da evolução da Nexa. São protótipos de referência; o editor atual está disponível no menu." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{[1,2,3,4].map((n) => <figure className="panel px-4 pb-4 pt-6" key={n}><img loading="lazy" className="mx-auto w-full max-w-44 rounded-xl" src={`/assets/prototipo-${n}.png`} alt={`Tela ${n} do protótipo Nexa da Sprint 3`} /><figcaption className="mt-5 text-center text-xs text-slate-400">Estudo de interface / 0{n}</figcaption></figure>)}</div>
    </section>
    <section id="equipe" className="border-t border-slate-800 bg-panel/40"><div className="wrap py-20"><SectionTitle numero="04" titulo="Nossa equipe" texto="Engenharia de Software · FIAP · Entrega conjunta de Front-end Design e Web Development" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{equipe.map(([nome, rm, papel]) => <article key={rm} className="rounded-xl border border-slate-700 p-5"><span className="mb-5 grid h-10 w-10 place-items-center rounded-full bg-teal-400/10 text-sm font-bold text-mint">{nome.split(' ').map(p => p[0]).join('')}</span><h3 className="font-semibold">{nome}</h3><p className="mt-2 text-xs text-mint">RM {rm}</p><p className="mt-3 text-xs leading-relaxed text-slate-400">{papel}</p></article>)}</div></div></section>
  </>;
}
