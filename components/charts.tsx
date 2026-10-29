import { enset } from '@/lib/content';

// Figures drawn from the manuscript tables in lib/content.ts. Each one renders the real numbers
// and carries a caption naming its source, so nothing here is decorative data.

const pct = (n: number) => n.toFixed(2) + '%';

export function ConfusionMatrix({ compact = false }: { compact?: boolean }) {
  const { labels, matrix } = enset.confusion;
  const total = matrix.flat().reduce((a, b) => a + b, 0);
  const correct = matrix.reduce((a, row, i) => a + row[i], 0);
  return (
    <figure className={'figure confusion' + (compact ? ' compact' : '')}>
      <div className="figure-head">
        <span>Fig. {compact ? '1' : '3'}</span>
        <span>Confusion matrix · held-out test</span>
      </div>
      <table className="cm">
        <caption className="sr-only">
          MobileNetV3-Small, fold 3. Rows are true classes, columns are predicted classes.
        </caption>
        <thead>
          <tr>
            <th scope="col"><span className="cm-axis">true ↓ / predicted →</span></th>
            {labels.map(l => <th scope="col" key={l}>{l}</th>)}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => {
            const rowTotal = row.reduce((a, b) => a + b, 0);
            return (
              <tr key={labels[i]}>
                <th scope="row">{labels[i]}</th>
                {row.map((v, j) => {
                  const share = v / rowTotal;
                  const flagged = labels[i] === 'Aged' && labels[j] === 'Bacterial wilt';
                  const cls = ['cm-cell', i === j ? 'diag' : 'off', flagged ? 'flag' : ''].join(' ');
                  return (
                    <td key={j} className={cls} style={{ '--share': share.toFixed(3) } as React.CSSProperties}>
                      <span className="cm-n">{v}</span>
                      <span className="cm-p">{(share * 100).toFixed(1)}%</span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <figcaption>
        MobileNetV3-Small, best fold. {correct} of {total} test images correct ({pct((correct / total) * 100)}).
        The marked cell is the error this study targets: <strong>7 of 510</strong> aged leaves flagged as wilt (1.37%).
      </figcaption>
    </figure>
  );
}

export function ModelComparison() {
  const lo = 84, hi = 98;
  const x = (v: number) => ((v - lo) / (hi - lo)) * 100;
  const ticks = [84, 86, 88, 90, 92, 94, 96, 98];
  const maxParams = Math.max(...enset.models.map(m => m.params));
  return (
    <figure className="figure models">
      <div className="figure-head">
        <span>Fig. 2</span>
        <span>Test accuracy by architecture · five fold-trained models each</span>
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
        Dots are the five fold-trained models, the bar is ±1 SD and the vertical mark is the mean, all scored on the same plant-wise held-out test set.
        The smallest network was the most accurate and the most stable.
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
