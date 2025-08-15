import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import banner from '@/assets/branding/banner_om87fj.jpg';
import logo from '@/assets/branding/logo_fznhik.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="container flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded" />
          <span className="text-xl font-bold" style={{ color: 'hsl(240 33% 28%)' }}>AITool Pool</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/auth"><Button variant="outline">Sign in</Button></Link>
          <Link to="/app"><Button>Enter App</Button></Link>
        </div>
      </header>

      <main>
        <section
          className="relative min-h-[70vh] flex items-center"
          style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(240_33%_28%_/0.85)] to-[hsl(203_100%_55%_/0.7)]" />
          <div className="container relative z-10 py-20">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight">
              Discover, test, and launch AI tools instantly
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl">
              A curated pool of AI utilities with zero-friction browser tests and fast downloads.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/app"><Button size="lg" className="shadow-primary">Browse tools</Button></Link>
              <Link to="/auth"><Button size="lg" variant="secondary">Sign in</Button></Link>
            </div>
          </div>
        </section>

        <section className="container py-16">
          <h2 className="text-2xl font-semibold">Why AITool Pool?</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-lg bg-card shadow-card">
              <h3 className="font-semibold">Zero-click testing</h3>
              <p className="text-muted-foreground mt-2">Try tools right in your browser—no installs required.</p>
            </div>
            <div className="p-6 rounded-lg bg-card shadow-card">
              <h3 className="font-semibold">Curated quality</h3>
              <p className="text-muted-foreground mt-2">Only the most useful AI tools make the cut.</p>
            </div>
            <div className="p-6 rounded-lg bg-card shadow-card">
              <h3 className="font-semibold">Fast downloads</h3>
              <p className="text-muted-foreground mt-2">Grab what you need with one click when you’re ready.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
