import type { Project } from '@/lib/content';

// A lane diagram of a project's architecture, built from the components named in its
// documentation. Rendered as text so it stays readable, selectable and accessible.
export function SystemDiagram({ project, label }: { project: Project; label?: string }) {
  const { lanes, nodes } = project.diagram;
  return (
    <figure className="figure system" aria-label={(label ?? project.name) + ' architecture'}>
      <div className="figure-head">
        <span>Architecture</span>
        <span>{project.name}</span>
      </div>
      <ol className="lanes" style={{ '--lanes': lanes.length } as React.CSSProperties}>
        {lanes.map((lane, i) => (
          <li key={lane}>
            <span className="lane-name">{lane}</span>
            <ul>
              {nodes[i].map(n => <li key={n}>{n}</li>)}
            </ul>
          </li>
        ))}
      </ol>
      <figcaption>Drawn from the project documentation. It shows components and how they connect, not a screenshot.</figcaption>
    </figure>
  );
}
