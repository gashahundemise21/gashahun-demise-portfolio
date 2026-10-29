import { enset } from '@/lib/content';

// Figures drawn from the manuscript tables in lib/content.ts. Each one renders the real numbers
// and carries a caption naming its source, so nothing here is decorative data.


export function ModelComparison() {
  const lo = 84, hi = 98;
  const x = (v: number) => ((v - lo) / (hi - lo)) * 100;
  const ticks = [84, 86, 88, 90, 92, 94, 96, 98];
  const maxParams = Math.max(...enset.models.map(m => m.params));
  return (
    <figure className="figure models">
      <div className="figure-head">
        <span>Fig. 1</span>
        <span>Test accuracy by model</span>
      </div>
      <div className="models-grid" role="table" aria-label="Held-out test accuracy and parameter count per architecture">
        <div className="models-row models-header" role="row">
          <span role="columnheader">Architecture</span>
          <span role="columnheader" className="models-axis" aria-label="Accuracy, 84 to 98 percent">
            {ticks.map(t => <span key={t} style={{ left: x(t) + '%' }}>{t}</span>)}
          </span>
          <span role="columnheader">Mean ± SD</span>
          <span role="columnheader">Parameters</span>
        </div>
        {enset.models.map((m, i) => (
          <div className={'models-row' + (i === 0 ? ' lead' : '')} role="row" key={m.name}>
            <span role="cell" className="models-name">{m.name}</span>
            <span role="cell" className="models-track" aria-label={'Fold accuracies ' + m.folds.map(f => f + '%').join(', ')}>
              {ticks.map(t => <i key={t} className="tick" style={{ left: x(t) + '%' }} />)}
              <i className="sd" style={{ left: x(m.mean - m.sd) + '%', width: x(m.mean + m.sd) - x(m.mean - m.sd) + '%' }} />
              {m.folds.map((f, k) => <i key={k} className="fold" style={{ left: x(f) + '%' }} />)}
              <i className="mean" style={{ left: x(m.mean) + '%' }} />
            </span>
            <span role="cell" className="num">{m.mean.toFixed(2)} <small>± {m.sd.toFixed(2)}</small></span>
            <span role="cell" className="num params">
              <i style={{ width: Math.max(4, (m.params / maxParams) * 100) + '%' }} />
              {(m.params / 1e6).toFixed(2)}M
            </span>
          </div>
        ))}
      </div>
      <figcaption>
        Dots: five models each. Bar: ±1 SD. Mark: mean. The smallest network won.
      </figcaption>
    </figure>
  );
}

export function ClassBalance() {
  const max = Math.max(...enset.dataset.classes.map(c => c.count));
  return (
    <figure className="figure balance">
      <div className="figure-head">
        <span>Dataset</span>
        <span>{enset.dataset.total.toLocaleString('en-US')} field images</span>
      </div>
      <ul>
        {enset.dataset.classes.map(c => (
          <li key={c.key} className={'cls-' + c.key}>
            <span className="balance-label">{c.label}</span>
            <span className="balance-bar"><i style={{ width: (c.count / max) * 100 + '%' }} /></span>
            <span className="num">{c.count.toLocaleString('en-US')} <small>{c.share.toFixed(1)}%</small></span>
          </li>
        ))}
      </ul>
      <figcaption>{enset.dataset.region}. {enset.dataset.devices}.</figcaption>
    </figure>
  );
}
