import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function AdminProduits() {
  const { user } = useAuth();
  const [produits, setProduits] = useState([]);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    api.get('/produits').then((res) => setProduits(res.data.data));
  }, []);

  const handleSupprimer = async (id) => {
    try {
      await api.delete(`/produits/${id}`);
      setProduits(produits.filter((p) => p.id !== id));
    } catch (err) {
      setErreur('Suppression impossible.');
    }
  };

  if (!user || user.role !== 'admin') {
    return <p>Accès réservé aux administrateurs.</p>;
  }

  return (
    <div>
      <h1>Gestion des produits</h1>
      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((p) => (
            <tr key={p.id}>
              <td>{p.nom}</td>
              <td>{p.prix} FCFA</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleSupprimer(p.id)} style={{ color: 'red' }}>
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