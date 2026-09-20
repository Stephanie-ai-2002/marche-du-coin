import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const PRODUIT_VIDE = { nom: '', description: '', prix: '', stock: '', categorie_id: '' };

export default function AdminProduits() {
  const { user } = useAuth();
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [erreur, setErreur] = useState('');
  const [formOuvert, setFormOuvert] = useState(false);
  const [produitEnCours, setProduitEnCours] = useState(PRODUIT_VIDE);
  const [idEnEdition, setIdEnEdition] = useState(null);

  useEffect(() => {
    api.get('/produits').then((res) => setProduits(res.data.data));
    api.get('/categories').then((res) => setCategories(res.data));
  }, []);

  const handleSupprimer = async (id) => {
    try {
      await api.delete(`/produits/${id}`);
      setProduits(produits.filter((p) => p.id !== id));
    } catch (err) {
      setErreur('Suppression impossible.');
    }
  };

  const ouvrirCreation = () => {
    setProduitEnCours(PRODUIT_VIDE);
    setIdEnEdition(null);
    setFormOuvert(true);
  };

  const ouvrirModification = (p) => {
    setProduitEnCours({
      nom: p.nom,
      description: p.description || '',
      prix: p.prix,
      stock: p.stock,
      categorie_id: p.categorie?.id || '',
    });
    setIdEnEdition(p.id);
    setFormOuvert(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');
    try {
      if (idEnEdition) {
        const res = await api.put(`/produits/${idEnEdition}`, produitEnCours);
        setProduits(produits.map((p) => (p.id === idEnEdition ? res.data : p)));
      } else {
        const res = await api.post('/produits', produitEnCours);
        setProduits([...produits, res.data]);
      }
      setFormOuvert(false);
    } catch (err) {
      setErreur("Impossible d'enregistrer le produit.");
    }
  };

  if (!user || user.role !== 'admin') {
    return <p>Accès réservé aux administrateurs.</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Gestion des produits</h1>
        <button className="btn-principal" onClick={ouvrirCreation}>
          + Nouveau produit
        </button>
      </div>

      {erreur && <p style={{ color: 'var(--terracotta)' }}>{erreur}</p>}

      {formOuvert && (
        <form
          onSubmit={handleSubmit}
          style={{
            border: '1px solid var(--vert)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            maxWidth: '360px',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.1rem' }}>
            {idEnEdition ? 'Modifier le produit' : 'Nouveau produit'}
          </h2>
          <input
            type="text"
            placeholder="Nom"
            value={produitEnCours.nom}
            onChange={(e) => setProduitEnCours({ ...produitEnCours, nom: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={produitEnCours.description}
            onChange={(e) => setProduitEnCours({ ...produitEnCours, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Prix"
            value={produitEnCours.prix}
            onChange={(e) => setProduitEnCours({ ...produitEnCours, prix: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={produitEnCours.stock}
            onChange={(e) => setProduitEnCours({ ...produitEnCours, stock: e.target.value })}
            required
          />
          <select
            value={produitEnCours.categorie_id}
            onChange={(e) => setProduitEnCours({ ...produitEnCours, categorie_id: e.target.value })}
            required
          >
            <option value="">Choisir une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nom}</option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn-principal">Enregistrer</button>
            <button type="button" className="btn-secondaire" onClick={() => setFormOuvert(false)}>
              Annuler
            </button>
          </div>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((p) => (
            <tr key={p.id}>
              <td>{p.nom}</td>
              <td>{p.categorie?.nom}</td>
              <td>{p.prix} FCFA</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn-secondaire" onClick={() => ouvrirModification(p)}>
                  Modifier
                </button>{' '}
                <button className="btn-secondaire" onClick={() => handleSupprimer(p.id)}>
                  Suppr.
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}