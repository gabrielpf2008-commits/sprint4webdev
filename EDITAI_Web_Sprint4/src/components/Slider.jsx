export default function Slider({ nome, campo, valor, minimo = 0, maximo = 200, onAlterar, disabled }) {
  return <div><div className="mb-2 flex justify-between text-sm"><label htmlFor={`ajuste-${campo}`}>{nome}</label><output htmlFor={`ajuste-${campo}`} className="text-mint">{valor}{campo === 'matiz' ? '°' : '%'}</output></div><input disabled={disabled} id={`ajuste-${campo}`} type="range" min={minimo} max={maximo} value={valor} onChange={e => onAlterar(campo, e.target.value)} /></div>;
}
