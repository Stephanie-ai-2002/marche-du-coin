import { createContext, useContext, useState } from 'react';

const PanierContext = createContext();

export function PanierProvider({ children }) {
  const [articles, setArticles] = useState([]);

  const ajouterArticle = (produit, quantite) => {
    setArticles((prev) => {
      const existant = prev.find((a) => a.produit.id === produit.id);
      if (existant) {
        return prev.map((a) =>
          a.produit.id === produit.id ? { ...a, quantite: a.quantite + quantite } : a
        );
      }
      return [...prev, { produit, quantite }];
    });
  };

  const retirerArticle = (produitId) => {
    setArticles((prev) => prev.filter((a) => a.produit.id !== produitId));
  };

  const modifierQuantite = (produitId, quantite) => {
    setArticles((prev) =>
      prev.map((a) => (a.produit.id === produitId ? { ...a, quantite } : a))
    );
  };

  const viderPanier = () => setArticles([]);

  const total = articles.reduce((sum, a) => sum + a.produit.prix * a.quantite, 0);

  return (
    <PanierContext.Provider
      value={{ articles, ajouterArticle, retirerArticle, modifierQuantite, viderPanier, total }}
    >
      {children}
    </PanierContext.Provider>
  );
}

export function usePanier() {
  return useContext(PanierContext);
}