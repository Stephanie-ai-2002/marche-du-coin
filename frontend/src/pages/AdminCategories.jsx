import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function AdminCategories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [modificationId, setModificationId] = useState(null);
  const [erreur, setErreur] = useState('');

  const chargerCategories = () => {
    api.get('/categories').then((res) => setCategories(res.data));
  };

  useEffect(() => {
    chargerCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');
    try {
      if (modificationId) {
        await api.put(`/categories/${modificationId}`, { nom, description });
      } else {
        await api.post('/categories', { nom, description });
      }
      setNom('');
      setDescription('');
      setModificationId(null);
      chargerCategories();
    } catch (err) {
      setErreur('Impossible d\'enregistrer la catégorie.');
    }
  };

  const handleModifier = (categorie) => {
    setModificationId(categorie.id);
    setNom(categorie.nom);
    setDescription(categorie.description || '');
  };

  const handleSupprimer = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      chargerCategories();
    } catch (err) {
      setErreur('Suppression impossible.');
    }
  };

  if (!user || user.role !== 'admin') {
    return <p>Accès réservé aux administrateurs.</p>;
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Poppins, sans-serif', color: '#333333' }}>Gestion des catégories</h1>

      <form onSubmit={handleSubmit} className="admin-form">
        <div>
          <label>Nom</label><br />
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '0.4rem' }}
          />
        </div>
        <div>
          <label>Description</label><br />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '0.4rem' }}
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#E07A5F', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          {modificationId ? 'Mettre à jour' : '+ Nouvelle catégorie'}
        </button>
        {modificationId && (
          <button
            type="button"
            onClick={() => { setModificationId(null); setNom(''); setDescription(''); }}
            style={{ backgroundColor: 'transparent', color: '#2F5233', border: '1px solid #2F5233', borderRadius: '6px', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Annuler
          </button>
        )}
      </form>

      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

      <table className="admin-table">
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #2F5233' }}>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{cat.nom}</td>
              <td>{cat.description}</td>
              <td>
                <button onClick={() => handleModifier(cat)} style={{ color: '#2F5233', border: 'none', background: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>
                  Modifier
                </button>
                <button onClick={() => handleSupprimer(cat.id)} style={{ color: '#E07A5F', border: 'none', background: 'none', cursor: 'pointer' }}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}