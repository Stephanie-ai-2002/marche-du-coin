import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Inscription() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [erreur, setErreur] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');

    if (password !== passwordConfirmation) {
      setErreur('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await register(name, email, password, passwordConfirmation);
      navigate('/');
    } catch (err) {
      setErreur('Impossible de créer le compte. Vérifiez vos informations.');
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
        <h1 style={{ marginTop: 0 }}>Inscription</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          {erreur && <p style={{ color: 'var(--terracotta)' }}>{erreur}</p>}
          <button type="submit" className="btn-principal">
            S'inscrire
          </button>
        </form>

        <Link
          to="/login"
          className="btn-secondaire"
          style={{ display: 'block', textAlign: 'center', marginTop: '1rem', textDecoration: 'none' }}
        >
          Déjà un compte ? Se connecter
        </Link>
      </div>
    </div>
  );
}