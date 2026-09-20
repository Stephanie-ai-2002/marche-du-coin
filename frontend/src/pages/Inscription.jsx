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
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '300px' }}>
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
        {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
        <button type="submit" style={{ backgroundColor: '#2F5233', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '4px', cursor: 'pointer' }}>
          S'inscrire
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Déjà un compte ? <Link to="/login">Connectez-vous</Link>
      </p>
    </div>
  );
}