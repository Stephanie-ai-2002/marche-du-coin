import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePanier } from '../context/PanierContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { articles } = usePanier();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#2F5233', color: 'white' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Marché du Coin
      </Link>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/catalogue" style={{ color: 'white' }}>Catalogue</Link>
        <Link to="/panier" style={{ color: 'white' }}>Panier ({articles.length})</Link>
        {user ? (
          <>
            <Link to="/mes-commandes" style={{ color: 'white' }}>Mes commandes</Link>
            {user.role === 'admin' && <Link to="/admin" style={{ color: 'white' }}>Admin</Link>}
            <button onClick={logout} style={{ backgroundColor: '#E07A5F', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white' }}>Connexion</Link>
            <Link to="/register" style={{ color: 'white' }}>Inscription</Link>
          </>
        )}
      </nav>
    </header>
  );
}