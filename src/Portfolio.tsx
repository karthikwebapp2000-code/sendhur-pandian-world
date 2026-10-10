import { useEffect, useState } from 'react';
import Header from './components/Header';
import './Portfolio.css';

type GitHubCommit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { name: string; date: string } | null;
  };
};

const repository = 'karthikwebapp2000-code/karthikwebapp';

const featureHighlights = [
  {
    title: 'Product Design',
    text: 'Clean interfaces, polished flows, and premium visual systems that feel effortless.',
  },
  {
    title: 'Full-Stack Builds',
    text: 'From frontend polish to reliable backend logic, I build complete product experiences.',
  },
  {
    title: 'Performance Focus',
    text: 'Fast, responsive experiences optimized for users, conversion, and long-term scale.',
  },
];

function Profile() {
  return (
    <section className="profile glass-panel" id="profile" aria-labelledby="profile-title">
      <div className="profile-photo-frame glass-card">
        <img
          className="profile-photo"
          src="/portrait-sendhur-pandian-m.svg"
          alt="Portrait of Sendhur Pandian M"
        />
      </div>
      <div className="profile-copy">
        <p className="eyebrow">About me</p>
        <h2 id="profile-title">Sendhur Pandian M<span>.</span></h2>
        <p>
          Full-stack developer building modern, reliable web experiences with TypeScript, React,
          and design-focused engineering.
        </p>
      </div>
    </section>
  );
}

function GitHubLog() {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repository}/commits?per_page=5`)
      .then((response) => {
        if (!response.ok) throw new Error('GitHub activity could not be loaded.');
        return response.json();
      })
      .then(setCommits)
      .catch((requestError: unknown) =>
        setError(requestError instanceof Error ? requestError.message : 'Unable to load GitHub activity.')
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="github-log" id="github-log" aria-labelledby="github-log-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Open source activity</p>
          <h2 id="github-log-title">GitHub log</h2>
        </div>
        <a className="github-link" href={`https://github.com/${repository}`} target="_blank" rel="noreferrer">
          View repository ↗
        </a>
      </div>
      {loading && <p className="log-message">Loading the latest commits…</p>}
      {error && <p className="log-message error">{error}</p>}
      {!loading && !error && commits.length === 0 && <p className="log-message">No commits found yet.</p>}
      {!loading && !error && commits.length > 0 && (
        <div className="commit-list">
          {commits.map((item) => (
            <a className="commit-item glass-card" href={item.html_url} key={item.sha} target="_blank" rel="noreferrer">
              <span className="commit-dot" aria-hidden="true" />
              <span className="commit-details">
                <strong>{item.commit.message.split('\n')[0]}</strong>
                <span>
                  {item.commit.author?.name ?? 'Unknown author'} ·{' '}
                  {item.commit.author?.date ? new Date(item.commit.author.date).toLocaleDateString() : 'Unknown date'}
                </span>
              </span>
              <span className="commit-sha">{item.sha.slice(0, 7)} ↗</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <section className="hero" id="home">
          <div className="hero-orb orb-one" aria-hidden="true" />
          <div className="hero-orb orb-two" aria-hidden="true" />

          <div className="hero-badge glass-pill">Available for select work</div>

          <div className="hero-grid">
            <div className="hero-copy-block">
              <p className="eyebrow reveal-up">Hello, I’m</p>
              <h1 className="reveal-up">
                Karthik<span>.</span>
              </h1>
              <p className="hero-copy reveal-up">
                I design and build fast, elegant web experiences that feel modern, human, and measurable.
              </p>

              <div className="hero-actions reveal-up">
                <a href="#profile" className="primary-button glass-button">
                  About me
                </a>
                <a href="#github-log" className="secondary-button glass-button ghost">
                  GitHub log
                </a>
              </div>
            </div>

            <div className="hero-visual reveal-up">
              <div className="visual-core glass-card">
                <div className="visual-label">Product design + engineering</div>
                <div className="visual-ring">
                  <div className="visual-center">
                    <span>UX</span>
                  </div>
                </div>
                <div className="visual-metrics">
                  <div>
                    <strong>React</strong>
                    <small>UI systems</small>
                  </div>
                  <div>
                    <strong>TS</strong>
                    <small>Clean architecture</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-panel glass-card reveal-up">
            <div className="panel-head">
              <span className="status-dot" />
              <span>Currently building</span>
            </div>
            <p>High-impact digital products with premium UX and maintainable code.</p>
          </div>

          <div className="hero-stats reveal-up">
            <div className="glass-card stat-card">
              <strong>4+</strong>
              <span>Years building</span>
            </div>
            <div className="glass-card stat-card">
              <strong>20+</strong>
              <span>Interfaces shipped</span>
            </div>
            <div className="glass-card stat-card">
              <strong>100%</strong>
              <span>Product focus</span>
            </div>
          </div>
        </section>

        <section className="feature-section" aria-label="Key strengths">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Capabilities</p>
              <h2>What I bring</h2>
            </div>
          </div>

          <div className="feature-grid">
            {featureHighlights.map((feature, index) => (
              <article
                key={feature.title}
                className="feature-card glass-card"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="feature-icon">0{index + 1}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <Profile />
        <GitHubLog />
      </main>
    </>
  );
}
