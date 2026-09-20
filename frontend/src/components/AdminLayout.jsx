import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();

  const liens = [
    { to: '/admin', label: 'Produits' },
    { to: '/admin/categories', label: 'Catégories' },
    { to: '/admin/commandes', label: 'Commandes' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '80vh' }}>
      <aside style={{ width: '220px', backgroundColor: '#2F5233', color: 'white', padding: '1.5rem 1rem' }}>
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Espace Admin
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {liens.map((lien) => (
            <Link
              key={lien.to}
              to={lien.to}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 0.8rem',
                borderRadius: '4px',
                backgroundColor: location.pathname === lien.to ? '#E07A5F' : 'transparent',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {lien.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '1.5rem 2rem', backgroundColor: '#FAF3E8' }}>
        <Outlet />
      </main>
    </div>
  );
}