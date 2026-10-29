import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { enset, profile } from '@/lib/content';
import { ClassBalance, ModelComparison } from '@/components/charts';

export const metadata = {
  title: 'Research · Senescence-aware enset classification',
  description:
    'Telling sick enset leaves from old ones. 7,545 field photos, five models, 95.42% mean accuracy. Unpublished manuscript.',
  alternates: { canonical: '/research' },
};

export default function Research() {
  return (
    <main id="main" className="paper wrap">
      <Link className="text-link back" href="/"><ArrowLeft size={16} aria-hidden="true" /> Home</Link>

      <header className="paper-head">
        <p className="eyebrow">Research · {enset.period}</p>
        <h1>{enset.title}</h1>
        <p className="paper-dek">{enset.question}</p>
        <dl className="paper-meta">
          <div><dt>Status</dt><dd>{enset.status}</dd></div>
          <div><dt>My role</dt><dd>{enset.role}</dd></div>
          <div><dt>Stack</dt><dd>Python · TensorFlow / Keras · 2× NVIDIA T4</dd></div>
        </dl>
        <p className="notice">
          Not yet peer reviewed. Numbers come from the manuscript draft. Data and models are private.
        </p>
      </header>

      <div className="paper-body">
        <section aria-labelledby="r-problem">
          <h2 id="r-problem"><span className="idx">1</span>Problem</h2>
          <p>{enset.why}</p>
          <p className="pull">{enset.contribution}</p>
        </section>

        <section aria-labelledby="r-data">
          <h2 id="r-data"><span className="idx">2</span>Dataset</h2>
          <p>{enset.dataset.total.toLocaleString('en-US')} leaf photos from the {enset.dataset.region}. {enset.dataset.labelling}. Balanced classes, so no class dominates.</p>
          <ClassBalance />
        </section>

        <section aria-labelledby="r-protocol">
          <h2 id="r-protocol"><span className="idx">3</span>Evaluation design</h2>
          <p>Built so the model learns the disease, not the plant.</p>
          <ol className="protocol">
            {enset.protocol.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
          </ol>
          <aside className="audit">
            <h3>{enset.audit.title}</h3>
            <p>{enset.audit.text}</p>
            <ul className="tags small">{enset.audit.methods.map(m => <li key={m}>{m}</li>)}</ul>
          </aside>
        </section>

        <section aria-labelledby="r-results">
          <h2 id="r-results"><span className="idx">4</span>Results</h2>
          <p>Five backbones, same setup, same test set. Each score is the mean ± SD of five models.</p>
          <ModelComparison />
          <div className="table-wrap">
            <table className="data">
              <caption>Test results (%), mean ± SD of five models</caption>
              <thead><tr><th scope="col">Architecture</th><th scope="col">Accuracy</th><th scope="col">Macro F1</th><th scope="col">Best fold</th><th scope="col">Parameters</th></tr></thead>
              <tbody>
                {enset.models.map(m => (
                  <tr key={m.name}>
                    <th scope="row">{m.name}</th>
                    <td>{m.mean.toFixed(2)} ± {m.sd.toFixed(2)}</td>
                    <td>{m.f1.toFixed(2)}</td>
                    <td>{Math.max(...m.folds).toFixed(2)}</td>
                    <td>{m.params.toLocaleString('en-US')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="findings">{enset.findings.map(f => <li key={f}>{f}</li>)}</ul>
        </section>

        <section aria-labelledby="r-limits">
          <h2 id="r-limits"><span className="idx">5</span>What is next</h2>
          <ul className="limits">{enset.limits.map(l => <li key={l}>{l}</li>)}</ul>
        </section>

        <section aria-labelledby="r-contact" className="paper-end">
          <h2 id="r-contact"><span className="idx">6</span>Let&rsquo;s talk</h2>
          <p>
            Questions about the method? Write to <a href={'mailto:' + profile.email}>{profile.email}</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
