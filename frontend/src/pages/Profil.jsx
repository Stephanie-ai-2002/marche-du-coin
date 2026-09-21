import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

function Profil() {
  const { user, mettreAJourUtilisateur } = useAuth();

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [chargement, setChargement] = useState(true);
  const [enregistrement, setEnregistrement] = useState(false);
  const [erreurs, setErreurs] = useState({});
  const [messageSucces, setMessageSucces] = useState('');

  useEffect(() => {
    api.get('/profil')
      .then((res) => {
        setNom(res.data.name);
        setEmail(res.data.email);
      })
      .catch(() => setErreurs({ global: 'Impossible de charger le profil.' }))
      .finally(() => setChargement(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnregistrement(true);
    setErreurs({});
    setMessageSucces('');

    try {
      const res = await api.put('/profil', { name: nom, email });
      mettreAJourUtilisateur(res.data);
      setMessageSucces('Profil mis à jour avec succès.');
    } catch (err) {
      if (err.response?.status === 422) {
        setErreurs(err.response.data.errors);
      } else {
        setErreurs({ global: "Une erreur est survenue lors de l'enregistrement." });
      }
    } finally {
      setEnregistrement(false);
    }
  };

  if (chargement) return <p>Chargement du profil...</p>;

  return (
    <div className="page-profil">
      <h1>Mon profil</h1>

      {erreurs.global && <p className="erreur">{erreurs.global}</p>}
      {messageSucces && <p className="succes">{messageSucces}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="nom">Nom</label>
        <input
          id="nom"
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        {erreurs.name && <p className="erreur">{erreurs.name[0]}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {erreurs.email && <p className="erreur">{erreurs.email[0]}</p>}

        <button type="submit" disabled={enregistrement}>
          {enregistrement ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
}

export default Profil;