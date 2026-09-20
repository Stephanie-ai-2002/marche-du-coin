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
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '300px' }}>
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
        {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
        <button type="submit" style={{ backgroundColor: '#2F5233', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '4px', cursor: 'pointer' }}>
          Se connecter
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link>
      </p>
    </div>
  );
}