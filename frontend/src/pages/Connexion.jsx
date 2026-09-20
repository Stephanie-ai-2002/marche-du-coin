import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setErreur('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <div
        style={{
          border: '1px solid var(--vert)',
          borderRadius: '8px',
          padding: '2rem',
          width: '100%',
          maxWidth: '360px',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ marginTop: 0 }}>Connexion</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {erreur && <p style={{ color: 'var(--terracotta)' }}>{erreur}</p>}
          <button type="submit" className="btn-principal">
            Se connecter
          </button>
        </form>

        <Link
          to="/register"
          className="btn-secondaire"
          style={{ display: 'block', textAlign: 'center', marginTop: '1rem', textDecoration: 'none' }}
        >
          Pas de compte ? S'inscrire
        </Link>
      </div>
    </div>
  );
}