import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { enset, profile } from '@/lib/content';
import { ClassBalance, ConfusionMatrix, ModelComparison } from '@/components/charts';

export const metadata = {
  title: 'Research · Senescence-aware enset classification',
  description:
    'A three-class enset leaf classifier that models natural senescence explicitly. 7,545 field images, plant-wise splits, five backbones, MobileNetV3-Small at 95.42 ± 0.63% mean test accuracy. Unpublished manuscript.',
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
          <div><dt>Stack</dt><dd>Python · TensorFlow 2.10 / Keras · two NVIDIA T4 GPUs</dd></div>
        </dl>
        <p className="notice">
          This work has not been peer reviewed or published. Every number below comes from the current manuscript draft and may change in review.
          The dataset and trained models are not public.
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
          <p>
            {enset.dataset.total.toLocaleString('en-US')} enset leaf images were collected on farms in the {enset.dataset.region}. They were taken with {enset.dataset.devices.toLowerCase()}.
            Labels come from {enset.dataset.labelling.toLowerCase()}, which separated naturally senescent leaves from wilt-infected and healthy ones.
            The classes are close to balanced, so accuracy is not dominated by one class.
          </p>
          <ClassBalance />
        </section>

        <section aria-labelledby="r-protocol">
          <h2 id="r-protocol"><span className="idx">3</span>Evaluation design</h2>
          <p>The protocol exists to stop the model from being rewarded for recognising a particular plant instead of a condition.</p>
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
          <p>
            Five ImageNet-pretrained backbones were compared under the same head, protocol and held-out test set.
            Precision, recall and F1 are macro-averaged, and every value is the mean ± sample SD of five fold-trained models.
          </p>
          <ModelComparison />
          <div className="table-wrap">
            <table className="data">
              <caption>Held-out test performance (%), mean ± SD over five fold-trained models</caption>
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
          <ConfusionMatrix />
          <ul className="findings">{enset.findings.map(f => <li key={f}>{f}</li>)}</ul>
        </section>

        <section aria-labelledby="r-limits">
          <h2 id="r-limits"><span className="idx">5</span>Limitations and next steps</h2>
          <ul className="limits">{enset.limits.map(l => <li key={l}>{l}</li>)}</ul>
        </section>

        <section aria-labelledby="r-contact" className="paper-end">
          <h2 id="r-contact"><span className="idx">6</span>Discuss the work</h2>
          <p>
            I am happy to talk through the methodology, the leakage audit or the evaluation design. Write to <a href={'mailto:' + profile.email}>{profile.email}</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
