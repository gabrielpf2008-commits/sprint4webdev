export default function SectionTitle({ numero, titulo, texto }) {
  return <div className="mb-10 max-w-2xl"><p className="eyebrow mb-3">{numero} / EDITAI</p><h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">{titulo}</h2>{texto && <p className="leading-relaxed text-slate-400">{texto}</p>}</div>;
}
