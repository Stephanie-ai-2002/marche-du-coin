import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const liens = [
    { to: '/admin', label: 'Produits' },
    { to: '/admin/categories', label: 'Catégories' },
    { to: '/admin/commandes', label: 'Commandes' },
  ];

  const handleDeconnexion = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <span>Marché du Coin — Administration</span>
        <button className="admin-header__logout" onClick={handleDeconnexion}>
          Déconnexion
        </button>
      </header>

      <div className="admin-body">
        <aside className="admin-sidebar">
          <h2 className="admin-sidebar__title">Menu Admin</h2>
          <nav className="admin-sidebar__nav">
            {liens.map((lien) => (
              <Link
                key={lien.to}
                to={lien.to}
                className={`admin-sidebar__link ${location.pathname === lien.to ? 'admin-sidebar__link--actif' : ''}`}
              >
                {lien.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}