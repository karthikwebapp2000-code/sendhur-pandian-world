import { useEffect, useState, type AnimationEvent, type FormEvent, type ReactNode } from 'react';
import { supabase } from './lib/supabase';
import Portfolio from './Portfolio';
import './App.css';

type Language = 'ta' | 'en';
type Gender = 'female' | 'male' | 'nonbinary' | 'prefer-not';
type Stage =
  | 'intro'
  | 'language'
  | 'profile'
  | 'accountChoice'
  | 'signup'
  | 'login'
  | 'verifySignup'
  | 'forgot'
  | 'verifyRecovery'
  | 'newPassword'
  | 'portfolio';

type ProfileDetails = { dateOfBirth: string; gender: Gender };
type Copy = {
  brand: string; step: string; title: string; description: string; continue: string;
  back: string; tamil: string; english: string; dob: string; gender: string;
  female: string; male: string; nonbinary: string; preferNot: string;
  create: string; login: string; already: string; email: string; password: string;
  confirm: string; sendOtp: string; otp: string; verify: string; forgot: string;
  reset: string; newPassword: string; changePassword: string; signOut: string;
  demoWarning: string; languageHelp: string; profileHelp: string;
};

const copy: Record<Language, Copy> = {
  ta: {
    brand: 'செந்தூர் பாண்டியன் உலகம்', step: 'உங்கள் அடுத்த படி', title: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    description: 'உங்களுக்கு வசதியான மொழியில் தொடருங்கள்.', continue: 'தொடரவும் →', back: '← பின்னால்',
    tamil: 'தமிழ்', english: 'English', dob: 'பிறந்த தேதி', gender: 'பாலினம்',
    female: 'பெண்', male: 'ஆண்', nonbinary: 'மற்றொரு அடையாளம்', preferNot: 'சொல்ல விரும்பவில்லை',
    create: 'புதிய கணக்கை உருவாக்கு', login: 'உள்நுழை', already: 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையுங்கள்',
    email: 'மின்னஞ்சல் முகவரி', password: 'கடவுச்சொல்', confirm: 'கணக்கை உருவாக்கு',
    sendOtp: 'மின்னஞ்சல் OTP அனுப்பு', otp: 'மின்னஞ்சல் OTP குறியீடு', verify: 'சரிபார்த்து தொடரவும்',
    forgot: 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?', reset: 'கடவுச்சொல்லை மீட்டமைக்கவும்',
    newPassword: 'புதிய கடவுச்சொல்', changePassword: 'கடவுச்சொல்லை மாற்று', signOut: 'வெளியேறு',
    demoWarning: 'பாதுகாப்பான உள்நுழைவுக்கு Supabase அமைப்பைச் செய்ய வேண்டும். உங்கள் கடவுச்சொல் அல்லது OTP இந்த தளத்தில் சேமிக்கப்படாது.',
    languageHelp: 'மொழியை பின்னர் மாற்றலாம்.', profileHelp: 'உங்கள் விவரங்கள் உங்கள் கணக்குடன் பாதுகாப்பாக இணைக்கப்படும்.'
  },
  en: {
    brand: 'Sendhur Pandian World', step: 'YOUR NEXT STEP', title: 'Choose your language',
    description: 'Continue in the language you feel most comfortable using.', continue: 'Continue →',
    back: '← Back', tamil: 'தமிழ்', english: 'English', dob: 'Date of birth', gender: 'Gender',
    female: 'Female', male: 'Male', nonbinary: 'Another identity', preferNot: 'Prefer not to say',
    create: 'Create an account', login: 'Log in', already: 'Already have an account? Log in',
    email: 'Email address', password: 'Password', confirm: 'Create account',
    sendOtp: 'Send email OTP', otp: 'Email verification code', verify: 'Verify and continue',
    forgot: 'Forgot password?', reset: 'Reset your password', newPassword: 'New password',
    changePassword: 'Change password', signOut: 'Sign out',
    demoWarning: 'Supabase setup is required for secure authentication. Passwords and OTPs are never stored by this website.',
    languageHelp: 'You can change this later.', profileHelp: 'Your details will be securely associated with your account.'
  }
};

function KolamMark() {
  return (
    <div className="kolam-mark" aria-label="Tamil tradition welcome symbol">
      <svg viewBox="0 0 240 240" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="kolamStroke" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fff0c7" /><stop offset=".5" stopColor="#d4c3ff" /><stop offset="1" stopColor="#8b72ff" />
          </linearGradient>
        </defs>
        <g className="kolam-orbit" fill="none" stroke="url(#kolamStroke)" strokeWidth="2">
          <circle cx="120" cy="120" r="94" strokeDasharray="2 8" />
          <ellipse cx="120" cy="120" rx="72" ry="103" />
          <ellipse cx="120" cy="120" rx="103" ry="72" transform="rotate(45 120 120)" />
          <path d="M120 27 C148 55 148 83 120 101 C92 83 92 55 120 27Z M120 213 C148 185 148 157 120 139 C92 157 92 185 120 213Z M27 120 C55 92 83 92 101 120 C83 148 55 148 27 120Z M213 120 C185 92 157 92 139 120 C157 148 185 148 213 120Z" />
          <path d="M55 55 C91 52 103 78 120 101 C137 78 149 52 185 55 C188 91 162 103 139 120 C162 137 188 149 185 185 C149 188 137 162 120 139 C103 162 91 188 55 185 C52 149 78 137 101 120 C78 103 52 91 55 55Z" />
        </g>
        <circle cx="120" cy="120" r="29" fill="#18112d" stroke="#f1d9a7" strokeWidth="1.6" />
        <text x="120" y="130" textAnchor="middle" fontSize="29" fill="#fff0cc">வ</text>
      </svg>
      <span className="namaste-overlay" aria-hidden="true">🙏</span>
    </div>
  );
}

function WelcomeIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'tamil' | 'english'>('tamil');

  function finishTamil(event: AnimationEvent<HTMLParagraphElement>) {
    if (event.currentTarget === event.target && event.animationName === 'introFadeUp') {
      setPhase('english');
    }
  }

  function finishEnglish(event: AnimationEvent<HTMLParagraphElement>) {
    if (event.currentTarget === event.target && event.animationName === 'introFadeUp') {
      onComplete();
    }
  }

  return (
    <section className={`welcome-intro ${phase}`} aria-label="Sendhur Pandian World welcome animation">
      <div className="intro-starfield" aria-hidden="true" />
      {phase === 'tamil' ? (
        <div className="intro-content" key="tamil">
          <div className="intro-kicker intro-fade">தமிழர் மரபு · ஒரு புதிய உலகம்</div>
          <KolamMark />
          <h1 className="intro-title">வணக்கம்</h1>
          <p className="intro-line first-line">உங்களை அன்புடன் வரவேற்கிறது</p>
          <p className="intro-line second-line">செந்தூர் பாண்டியன் உலகம்</p>
          <p className="curved-note" onAnimationEnd={finishTamil}>மரபு · அன்பு · ஒற்றுமை</p>
        </div>
      ) : (
        <div className="english-phase" key="english">
          <div className="english-symbol" aria-hidden="true">🤝</div>
          <h1 className="english-title">Welcome</h1>
          <p className="english-sub" onAnimationEnd={finishEnglish}>Welcome to Sendhur Pandian World</p>
        </div>
      )}
      <div className="intro-bottom-mark">SENDHUR PANDIAN ULAGAM</div>
    </section>
  );
}

function PageFrame({ children, language, setLanguage }: {
  children: ReactNode; language: Language; setLanguage: (value: Language) => void;
}) {
  const c = copy[language];
  return (
    <div className="onboarding-shell">
      <header className="onboarding-header">
        <div className="onboarding-brand"><span className="brand-symbol">வ</span><span>{c.brand}</span></div>
        <label className="language-select-label">
          <span className="sr-only">Language</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value as Language)} aria-label="Choose language">
            <option value="ta">தமிழ்</option><option value="en">English</option>
          </select>
        </label>
      </header>
      <main className="onboarding-main">{children}</main>
      <footer className="onboarding-footer">மரபு · அன்பு · ஒற்றுமை <span>•</span> {c.brand}</footer>
    </div>
  );
}

function StepCard({ children, step }: { children: ReactNode; step: string }) {
  return <section className="step-card reveal-card"><p className="step-eyebrow">{step}</p>{children}</section>;
}

export default function App() {
  const [stage, setStage] = useState<Stage>(() =>
    window.location.hash.includes('type=recovery') ? 'newPassword' : 'intro'
  );
  const [language, setLanguage] = useState<Language>('ta');
  const [profile, setProfile] = useState<ProfileDetails>({ dateOfBirth: '', gender: 'prefer-not' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const c = copy[language];

  useEffect(() => {
    if (!supabase) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' && session) setStage('newPassword');
    });
    return () => subscription.unsubscribe();
  }, []);

  function updateLanguage(next: Language) {
    setLanguage(next);
    document.documentElement.lang = next;
  }

  async function saveProfile(id: string) {
    if (!supabase) throw new Error('Add your Supabase environment variables before using authentication.');
    const { error } = await supabase.from('profiles').upsert({
      id,
      date_of_birth: profile.dateOfBirth,
      gender: profile.gender,
      preferred_language: language,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });
    if (error) throw new Error(`Profile could not be saved: ${error.message}. Check that you ran supabase/schema.sql.`);
  }

  function requireBackend() {
    if (!supabase) {
      setMessage('Backend is not connected yet. Follow SETUP.md: create a Supabase project and add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return false;
    }
    return true;
  }

  async function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage('');
    if (!requireBackend()) return;
    if (password.length < 8) { setMessage('Use a password with at least 8 characters.'); return; }
    setBusy(true);
    try {
      const { data, error } = await supabase!.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { date_of_birth: profile.dateOfBirth, gender: profile.gender, preferred_language: language } }
      });
      if (error) throw error;
      if (data.session && data.user) {
        await saveProfile(data.user.id); setUserId(data.user.id); setStage('portfolio');
      } else {
        setStage('verifySignup');
        setMessage('A verification code was requested. Check your inbox and spam folder.');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Account creation failed. Please try again.');
    } finally { setBusy(false); }
  }

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage('');
    if (!requireBackend()) return;
    setBusy(true);
    try {
      const { data, error } = await supabase!.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      if (!data.user) throw new Error('Login succeeded but no user was returned.');
      await saveProfile(data.user.id);
      setUserId(data.user.id); setStage('portfolio');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login failed. Check your details and try again.');
    } finally { setBusy(false); }
  }

  async function verifySignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage('');
    if (!requireBackend()) return;
    setBusy(true);
    try {
      const { data, error } = await supabase!.auth.verifyOtp({ email: email.trim(), token: otp.trim(), type: 'signup' });
      if (error) throw error;
      if (!data.user) throw new Error('Verification did not return a user.');
      await saveProfile(data.user.id); setUserId(data.user.id); setStage('portfolio');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'That code could not be verified.');
    } finally { setBusy(false); }
  }

  async function requestRecovery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage('');
    if (!requireBackend()) return;
    setBusy(true);
    try {
      const { error } = await supabase!.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/` });
      if (error) throw error;
      setStage('verifyRecovery');
      setMessage('If this email belongs to an account, a recovery code has been sent. Check your inbox and spam folder.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not request a recovery email.');
    } finally { setBusy(false); }
  }

  async function verifyRecovery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage('');
    if (!requireBackend()) return;
    setBusy(true);
    try {
      const { error } = await supabase!.auth.verifyOtp({ email: email.trim(), token: otp.trim(), type: 'recovery' });
      if (error) throw error;
      setStage('newPassword');
      setMessage('Email verified. Choose a new password.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'That recovery code could not be verified.');
    } finally { setBusy(false); }
  }

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage('');
    if (!requireBackend()) return;
    if (password.length < 8) { setMessage('Use a password with at least 8 characters.'); return; }
    setBusy(true);
    try {
      const { data, error } = await supabase!.auth.updateUser({ password });
      if (error) throw error;
      if (data.user) {
        try { await saveProfile(data.user.id); } catch { /* Auth password update remains valid if profile setup needs attention. */ }
        setUserId(data.user.id);
      }
      setStage('portfolio');
      setMessage('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Password could not be updated.');
    } finally { setBusy(false); }
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    setUserId(null); setEmail(''); setPassword(''); setOtp(''); setMessage('');
    setStage('language');
  }

  if (stage === 'intro') return <WelcomeIntro onComplete={() => setStage('language')} />;

  if (stage === 'portfolio') {
    return (
      <div className="authenticated-portfolio">
        <div className="session-controls"><span>Signed in</span><button type="button" onClick={signOut}>{c.signOut}</button></div>
        <Portfolio />
      </div>
    );
  }

  const backToProfile = () => { setMessage(''); setStage('profile'); };
  const backToChoice = () => { setMessage(''); setPassword(''); setOtp(''); setStage('accountChoice'); };

  return (
    <PageFrame language={language} setLanguage={updateLanguage}>
      {stage === 'language' && (
        <StepCard step={c.step}>
          <h1>{c.title}</h1><p className="step-description">{c.description}</p>
          <div className="language-choices">
            <button type="button" className={`language-card ${language === 'ta' ? 'selected' : ''}`} onClick={() => updateLanguage('ta')}>
              <span className="language-glyph">அ</span><strong>தமிழ்</strong><small>தமிழில் தொடரவும்</small>
            </button>
            <button type="button" className={`language-card ${language === 'en' ? 'selected' : ''}`} onClick={() => updateLanguage('en')}>
              <span className="language-glyph">Aa</span><strong>English</strong><small>Continue in English</small>
            </button>
          </div>
          <p className="muted-note">{c.languageHelp}</p>
          <button className="action-button primary-action full-width" onClick={() => { setMessage(''); setStage('profile'); }}>{c.continue}</button>
        </StepCard>
      )}

      {stage === 'profile' && (
        <StepCard step={language === 'ta' ? 'படி 2 · உங்கள் விவரங்கள்' : 'STEP 2 · YOUR DETAILS'}>
          <button className="text-back" onClick={() => setStage('language')}>{c.back}</button>
          <h1>{language === 'ta' ? 'உங்களைப் பற்றி' : 'A little about you'}</h1>
          <p className="step-description">{c.profileHelp}</p>
          <form className="auth-form" onSubmit={(event) => { event.preventDefault(); setMessage(''); setStage('accountChoice'); }}>
            <label>{c.dob}<input type="date" required max={new Date().toISOString().slice(0, 10)} value={profile.dateOfBirth} onChange={(event) => setProfile({ ...profile, dateOfBirth: event.target.value })} /></label>
            <fieldset className="gender-fieldset"><legend>{c.gender}</legend>
              {([
                ['female', c.female], ['male', c.male], ['nonbinary', c.nonbinary], ['prefer-not', c.preferNot]
              ] as [Gender, string][]).map(([value, label]) => (
                <label className="radio-option" key={value}><input type="radio" name="gender" value={value} checked={profile.gender === value} onChange={() => setProfile({ ...profile, gender: value })} />{label}</label>
              ))}
            </fieldset>
            {message && <p className="status-message error-message" role="alert">{message}</p>}
            <button className="action-button primary-action full-width" type="submit">{c.continue}</button>
          </form>
        </StepCard>
      )}

      {stage === 'accountChoice' && (
        <StepCard step={language === 'ta' ? 'படி 3 · உங்கள் கணக்கு' : 'STEP 3 · YOUR ACCOUNT'}>
          <button className="text-back" onClick={backToProfile}>{c.back}</button>
          <h1>{language === 'ta' ? 'எப்படி தொடர விரும்புகிறீர்கள்?' : 'How would you like to continue?'}</h1>
          <p className="step-description">{language === 'ta' ? 'புதிய கணக்கை உருவாக்கவும் அல்லது ஏற்கனவே உள்ள கணக்கில் உள்நுழையவும்.' : 'Create a new account or sign in to your existing account.'}</p>
          <div className="account-actions">
            <button className="action-button primary-action" onClick={() => { setMessage(''); setStage('signup'); }}>{c.create} →</button>
            <button className="action-button secondary-action" onClick={() => { setMessage(''); setStage('login'); }}>{c.login} →</button>
          </div>
          <p className="muted-note">{c.demoWarning}</p>
        </StepCard>
      )}

      {(stage === 'signup' || stage === 'login') && (
        <StepCard step={stage === 'signup' ? (language === 'ta' ? 'புதிய கணக்கு' : 'CREATE ACCOUNT') : (language === 'ta' ? 'மீண்டும் வருக' : 'WELCOME BACK')}>
          <button className="text-back" onClick={backToChoice}>{c.back}</button>
          <h1>{stage === 'signup' ? c.create : c.login}</h1>
          <form className="auth-form" onSubmit={stage === 'signup' ? submitSignup : submitLogin}>
            <label>{c.email}<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
            <label>{c.password}<input type="password" autoComplete={stage === 'signup' ? 'new-password' : 'current-password'} minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
            {stage === 'signup' && <p className="muted-note">A verification code will be sent to your email before the account is activated.</p>}
            {stage === 'login' && <button type="button" className="inline-link" onClick={() => { setMessage(''); setStage('forgot'); }}>{c.forgot}</button>}
            {message && <p className="status-message" role="status">{message}</p>}
            <button className="action-button primary-action full-width" disabled={busy}>{busy ? 'Please wait…' : (stage === 'signup' ? c.confirm : c.login)}</button>
          </form>
          <button className="inline-link switch-link" onClick={() => { setMessage(''); setPassword(''); setStage(stage === 'signup' ? 'login' : 'signup'); }}>
            {stage === 'signup' ? c.already : c.create}
          </button>
        </StepCard>
      )}

      {stage === 'verifySignup' && (
        <StepCard step={language === 'ta' ? 'மின்னஞ்சல் சரிபார்ப்பு' : 'EMAIL VERIFICATION'}>
          <button className="text-back" onClick={() => setStage('signup')}>{c.back}</button>
          <h1>{c.otp}</h1><p className="step-description">Enter the code sent to <strong>{email}</strong>.</p>
          <form className="auth-form" onSubmit={verifySignup}>
            <label>{c.otp}<input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6,8}" maxLength={8} required value={otp} onChange={(event) => setOtp(event.target.value)} /></label>
            {message && <p className="status-message" role="status">{message}</p>}
            <button className="action-button primary-action full-width" disabled={busy}>{busy ? 'Verifying…' : c.verify}</button>
          </form>
        </StepCard>
      )}

      {stage === 'forgot' && (
        <StepCard step={language === 'ta' ? 'கணக்கு மீட்பு' : 'ACCOUNT RECOVERY'}>
          <button className="text-back" onClick={() => setStage('login')}>{c.back}</button>
          <h1>{c.reset}</h1><p className="step-description">We’ll send a recovery code to your account email.</p>
          <form className="auth-form" onSubmit={requestRecovery}>
            <label>{c.email}<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
            {message && <p className="status-message" role="status">{message}</p>}
            <button className="action-button primary-action full-width" disabled={busy}>{busy ? 'Sending…' : c.sendOtp}</button>
          </form>
        </StepCard>
      )}

      {stage === 'verifyRecovery' && (
        <StepCard step={language === 'ta' ? 'OTP சரிபார்ப்பு' : 'VERIFY RECOVERY CODE'}>
          <button className="text-back" onClick={() => setStage('forgot')}>{c.back}</button>
          <h1>{c.otp}</h1><p className="step-description">Enter the recovery code sent to <strong>{email}</strong>.</p>
          <form className="auth-form" onSubmit={verifyRecovery}>
            <label>{c.otp}<input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6,8}" maxLength={8} required value={otp} onChange={(event) => setOtp(event.target.value)} /></label>
            {message && <p className="status-message" role="status">{message}</p>}
            <button className="action-button primary-action full-width" disabled={busy}>{busy ? 'Verifying…' : c.verify}</button>
          </form>
        </StepCard>
      )}

      {stage === 'newPassword' && (
        <StepCard step={language === 'ta' ? 'புதிய கடவுச்சொல்' : 'NEW PASSWORD'}>
          <h1>{c.reset}</h1><p className="step-description">Choose a strong password with at least 8 characters.</p>
          <form className="auth-form" onSubmit={updatePassword}>
            <label>{c.newPassword}<input type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
            {message && <p className="status-message" role="status">{message}</p>}
            <button className="action-button primary-action full-width" disabled={busy}>{busy ? 'Updating…' : c.changePassword}</button>
          </form>
        </StepCard>
      )}
    </PageFrame>
  );
}
