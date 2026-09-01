import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050607', color: 'white', fontFamily: 'var(--mono, monospace)' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>404</h1>
        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>This page could not be found or has been moved.</p>
        <Link href="/" style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', color: 'white', textDecoration: 'none', transition: 'background 0.2s', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
          RETURN TO MAJIN STUDIOS
        </Link>
      </div>
    </main>
  );
}
