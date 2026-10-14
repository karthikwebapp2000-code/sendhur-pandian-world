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

const repository = 'karthikwebapp2000-code/sendhur-pandian-world'; // Update this to your verified GitHub username/repository.

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
          I’m Sendhur Pandian. This website is my personal home on the web for sharing my background, interests, projects, and future work. I’ll keep this profile updated as I add verified details.
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

          <div className="hero-badge glass-pill">Personal portfolio · Tamil + English</div>

          <div className="hero-grid">
            <div className="hero-copy-block">
              <p className="eyebrow reveal-up">Hello, I’m</p>
              <h1 className="reveal-up">
                Sendhur Pandian<span>.</span>
              </h1>
              <p className="hero-copy reveal-up">
                A personal space for my work, ideas, projects, and the things I’m learning. Built with care, clarity, and a Tamil-rooted identity.
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
            <p>Projects, experiments, engineering notes, and ways to connect—all in one place.</p>
          </div>

          <div className="hero-stats reveal-up">
            <div className="glass-card stat-card">
              <strong>01</strong>
              <span>Personal portfolio</span>
            </div>
            <div className="glass-card stat-card">
              <strong>∞</strong>
              <span>Ideas to explore</span>
            </div>
            <div className="glass-card stat-card">
              <strong>TA / EN</strong>
              <span>Tamil and English</span>
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

        <section className="feature-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading"><div><p className="eyebrow">Selected work</p><h2 id="projects-title">Projects & experiments</h2></div></div>
          <div className="feature-grid">
            <article className="feature-card glass-card"><div className="feature-icon">01</div><h3>Web experiences</h3><p>Responsive interfaces, thoughtful interactions, and accessible page layouts. Project details will be published here as each project is ready to share.</p><span className="project-status">Portfolio category</span></article>
            <article className="feature-card glass-card"><div className="feature-icon">02</div><h3>Mechanical concepts</h3><p>Engineering concepts, mechanisms, and design explorations presented with clear explanations and supporting visuals where available.</p><span className="project-status">Portfolio category</span></article>
            <article className="feature-card glass-card"><div className="feature-icon">03</div><h3>Creative experiments</h3><p>Small prototypes, animation studies, and ideas that combine technology, craft, and culture.</p><span className="project-status">Portfolio category</span></article>
          </div>
          <p className="section-note">These are portfolio categories, not claims of completed client work. Add project titles, screenshots, dates, tools, and live links before launch.</p>
        </section>

        <section className="info-section glass-panel" id="journey" aria-labelledby="journey-title">
          <div className="section-heading"><div><p className="eyebrow">The person behind the site</p><h2 id="journey-title">A little more about me</h2></div></div>
          <div className="info-columns">
            <article><h3>What this website is</h3><p>Sendhur Pandian World is intended to be a personal portfolio and information hub. It can introduce me, show my projects, explain how to contact me, and provide clear policies for visitors.</p></article>
            <article><h3>What matters here</h3><p>Clarity, respectful communication, useful work, accessibility, privacy, and an experience that works on mobile as well as desktop.</p></article>
            <article><h3>Keep it accurate</h3><p>Only verified biography details, qualifications, achievements, client names, testimonials, and statistics should be added. No placeholder should be presented as a real credential.</p></article>
          </div>
        </section>

        <section className="info-section glass-panel" id="faq" aria-labelledby="faq-title">
          <div className="section-heading"><div><p className="eyebrow">Help</p><h2 id="faq-title">Frequently asked questions</h2></div></div>
          <details className="faq-item"><summary>What is Sendhur Pandian World?</summary><p>A personal website intended to share my profile, projects, ideas, and relevant contact information.</p></details>
          <details className="faq-item"><summary>Can I collaborate or ask about a project?</summary><p>Use the contact details that the site owner publishes in the Contact section. A working contact form must be connected to a secure backend or trusted form provider before launch.</p></details>
          <details className="faq-item"><summary>Are all projects shown here finished client projects?</summary><p>No. Project descriptions must identify whether an item is a concept, experiment, personal project, or completed project. This template does not claim any unverified client work.</p></details>
          <details className="faq-item"><summary>How can I report an issue or request a correction?</summary><p>Contact the site owner using the verified contact channel published on this website and include the page and information that needs attention.</p></details>
        </section>

        <section className="info-section glass-panel" id="contact" aria-labelledby="contact-title">
          <div className="section-heading"><div><p className="eyebrow">Get in touch</p><h2 id="contact-title">Contact</h2></div></div>
          <p className="contact-intro">For questions, collaborations, project enquiries, or corrections, use a contact channel you can verify and maintain.</p>
          <div className="contact-notice"><strong>Launch checklist:</strong> Add your public email address or a secure contact form here. No email address or phone number has been invented for this template.</div>
          <a className="secondary-button glass-button" href="https://github.com/" target="_blank" rel="noreferrer">Find me on GitHub ↗</a>
          <p className="section-note">Replace this generic GitHub link with your actual profile before publishing.</p>
        </section>

        <section className="info-section glass-panel" id="privacy" aria-labelledby="privacy-title">
          <div className="section-heading"><div><p className="eyebrow">Website policies</p><h2 id="privacy-title">Privacy notice</h2></div></div>
          <p><strong>Last updated:</strong> 12 October 2026 · Review and confirm this notice before public launch.</p>
          <h3>Information this site may process</h3><p>The public portfolio is intended to be readable without an account. If sign-in, profile fields, analytics, contact forms, or third-party embeds are enabled, those features may process information such as an email address, account profile, messages, device/browser data, or usage events. Remove any feature you do not need.</p>
          <h3>Accounts and authentication</h3><p>The project setup uses Supabase Auth and a profiles table for the optional account flow. Authentication credentials should be handled by the authentication provider; passwords and one-time codes must never be stored in a custom profile table or exposed in frontend code. The database schema uses row-level security, but it must be reviewed and tested before launch.</p>
          <h3>Purpose and sharing</h3><p>Information should only be used to operate the features a visitor chooses to use, respond to enquiries, maintain security, and meet applicable legal obligations. Do not sell or share personal information for unrelated purposes. If third-party services are enabled, list them and link to their policies here.</p>
          <h3>Retention and visitor choices</h3><p>Keep information only as long as needed for the stated purpose. Publish a real contact channel for access, correction, deletion, or privacy questions. Legal rights and requirements vary by location and service.</p>
          <h3>Cookies, analytics, and children</h3><p>Disclose any cookies, analytics, embedded media, or tracking that are actually used. Do not claim that the site uses no tracking until the deployed site and its dependencies have been checked. If the site is intended for children or collects date of birth, obtain appropriate privacy and legal review before launch.</p>
          <p className="policy-warning">This is a practical draft, not legal advice. Customize it to the services you actually enable, your audience, and applicable law before publication.</p>
        </section>

        <section className="info-section glass-panel" id="terms" aria-labelledby="terms-title">
          <div className="section-heading"><div><p className="eyebrow">Website policies</p><h2 id="terms-title">Terms & conditions</h2></div></div>
          <p><strong>Last updated:</strong> 12 October 2026 · Draft for owner review.</p>
          <h3>Using this website</h3><p>You may browse this website for personal, informational purposes. Do not misuse the site, attempt unauthorized access, disrupt services, upload malicious material, or use content in a way that violates applicable law.</p>
          <h3>Content and intellectual property</h3><p>Unless a page says otherwise, original text, design, graphics, and project materials are owned by the site owner or used with permission. You may not reproduce or commercially use them without permission. Third-party trademarks and assets remain the property of their respective owners.</p>
          <h3>Accuracy and availability</h3><p>Content is provided for general information and may change. The site owner will make reasonable efforts to correct errors but does not guarantee that every page is complete, current, uninterrupted, or error-free. Project concepts are not professional engineering, financial, medical, or legal advice.</p>
          <h3>External links</h3><p>Links to third-party websites are provided for convenience. The site owner does not control those websites and is not responsible for their content, availability, or privacy practices.</p>
          <h3>Limitation and updates</h3><p>To the extent permitted by applicable law, the website is provided without warranties for uninterrupted availability. These terms may be updated when the site changes. Mandatory rights under applicable law are not excluded.</p>
          <h3>Contact and governing law</h3><p>Publish a verified contact address and specify the applicable governing law and dispute process with appropriate legal advice before launch. Do not publish a guessed address or jurisdiction.</p>
          <p className="policy-warning">This is a general template, not legal advice. Have the final terms reviewed for your actual services, location, and audience.</p>
        </section>

        <section className="info-section glass-panel" id="accessibility" aria-labelledby="accessibility-title">
          <div className="section-heading"><div><p className="eyebrow">Our commitment</p><h2 id="accessibility-title">Accessibility & site information</h2></div></div>
          <p>The site is designed to support responsive layouts, semantic headings, keyboard-friendly links, and reduced-motion preferences where implemented. Accessibility is an ongoing process; test the finished site with keyboard navigation, screen readers, zoom, contrast checks, and mobile devices before making a conformance claim.</p>
          <p><strong>Performance and SEO:</strong> This project includes a page title, description, language metadata, and a structure that can be crawled. Search engines choose their own snippets and may rewrite descriptions. Add a canonical URL, sitemap, robots rules, structured data, and Search Console verification after confirming the production domain.</p>
          <p><strong>Owner action:</strong> Replace all launch notes, generic links, draft policies, and placeholder project descriptions with accurate details. Confirm the production URL, privacy contact, and service providers before announcing the site.</p>
        </section>

      </main>
      <footer className="site-footer">
        <div className="footer-brand"><span className="footer-mark">வ</span><div><strong>Sendhur Pandian World</strong><span>Personal portfolio · Tamil heritage, thoughtful technology</span></div></div>
        <nav className="footer-links" aria-label="Legal and site links">
          <a href="#journey">About</a><a href="#projects">Projects</a><a href="#faq">FAQ</a><a href="#contact">Contact</a><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#accessibility">Accessibility</a>
        </nav>
        <p>© {new Date().getFullYear()} Sendhur Pandian World. Content and details should be verified by the site owner before launch.</p>
      </footer>
    </>
  );
}
