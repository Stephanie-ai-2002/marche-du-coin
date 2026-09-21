# Rapport court — Marché du Coin

Auteure : Stéphanie Hounkpatin — programme D-CLIC
Cours : Développement Web — Niveau Approfondi
Dépôt GitHub : https://github.com/Stephanie-ai-2002/marche-du-coin

## 1. Présentation du projet

**Marché du Coin** est une application e-commerce locale permettant à des clients de parcourir un catalogue de produits, passer commande, et suivre leurs commandes, tandis qu'un administrateur gère les produits, catégories et le statut des commandes.

- **Stack** : backend Laravel (API REST, MySQL, authentification Sanctum), frontend React + Vite (React Router, Context API, Axios).
- **Entités principales** : `users` (rôle `client`/`admin`), `categories`, `produits`, `commandes` (statuts `en_attente` / `confirmee` / `livree`), `lignes_commande`.
- **17 routes API** vérifiées via `php artisan route:list`.

## 2. Audit de conformité au cahier des charges

Un audit du projet par rapport au cahier des charges initial a permis d'identifier plusieurs écarts, tous corrigés au cours de la semaine 6 :

| Écart identifié | Statut |
|---|---|
| Absence de page profil (consultation/modification) | ✅ Corrigé (backend + frontend) |
| Absence de tests pour `CommandeController` | ✅ Corrigé (7 tests ajoutés) |
| Bug 500 sur la mise à jour du statut de commande (Form Request manquante) | ✅ Corrigé |
| Interface non responsive | ✅ Corrigé (header, layout admin, pages) |
| Validation des entrées gérée manuellement dans les contrôleurs | ✅ Corrigé (migration vers les Form Requests, voir section 4) |

## 3. Tests réalisés

L'ensemble des tests backend (PHPUnit) passe : **28 tests, 67 assertions**, répartis sur 4 classes de tests fonctionnels :

| Classe de test | Tests | Résultat |
|---|---|---|
| `AuthApiTest` | 11 | ✅ 11/11 |
| `CategorieApiTest` | 6 | ✅ 6/6 |
| `CommandeApiTest` | 7 | ✅ 7/7 |
| `ProduitApiTest` | 2 | ✅ 2/2 |
| **Total** | **26** (+ 2 tests d'exemple par défaut) | **✅ 28/28** |

Les tests couvrent notamment :
- l'authentification (inscription, connexion, gestion du profil, cas d'erreur : email invalide, mot de passe incorrect, email déjà utilisé) ;
- le contrôle d'accès par rôle (un client ne voit que ses commandes, seul un admin peut modifier un statut ou gérer les catégories) ;
- la validation des données (statut de commande invalide, catégorie sans nom, commande sans article).

Les captures d'écran des résultats de tests sont disponibles dans `screenshots/` (`tests-*-pass.png`).

Côté frontend, les parcours principaux (connexion, catalogue, ajout au panier, passage de commande, gestion admin) ont été vérifiés manuellement ; les captures correspondantes (`01-accueil.png` à `11-confirmation-commande.png`) documentent ces parcours.

## 4. Migration vers les Form Requests

Initialement, la validation des données était effectuée directement dans les contrôleurs via la façade `Validator`. Cette approche a été remplacée par des classes `FormRequest` dédiées (`php artisan make:request`), une par action de création/modification, pour chacun des contrôleurs `AuthController`, `ProduitController`, `CategorieController` et `CommandeController`.

**Bénéfices de cette migration :**
- Séparation claire entre logique de validation et logique métier.
- Messages d'erreur en français, centralisés dans chaque Form Request.
- Contrôleurs plus courts et plus lisibles.
- Format de réponse d'erreur (`422` avec `{ "errors": {...} }`) inchangé, donc aucun impact sur le frontend.

Cette migration a mis au jour deux bugs 500 (Form Requests manquantes ou imports incomplets), tous deux corrigés et couverts par les tests existants.

## 5. Sécurité

- Toutes les entrées sont validées côté serveur via les Form Requests.
- L'authentification repose sur Laravel Sanctum (tokens).
- Le contrôle d'accès administrateur est assuré par un middleware dédié (`EstAdmin`), testé explicitement (ex. : `test_seul_un_admin_peut_modifier_le_statut_dune_commande`).
- Les mots de passe sont hashés (`Hash::make`) et jamais renvoyés en clair.

## 6. Performance et éco-responsabilité

- CORS configuré avec un `max_age` pour éviter les requêtes preflight répétées.
- Interface sobre, sans ressources superflues.

## 7. Limite connue

**Vérification et décrémentation du stock non implémentées** dans `CommandeController::store()` : une commande peut actuellement être créée sans vérifier que la quantité demandée est disponible, et le stock des produits n'est pas décrémenté après commande. Cet écart fonctionnel est identifié et documenté ici en toute transparence ; il n'a pas été corrigé dans le temps imparti afin de ne pas fragiliser une fonctionnalité déjà stable et testée juste avant la remise. Une évolution possible serait d'ajouter cette vérification dans une prochaine itération, avec des tests dédiés (quantité insuffisante → 422, stock décrémenté après commande réussie).

## 8. Conclusion

Le projet répond aux exigences du cahier des charges : application full-stack React + Laravel fonctionnelle, testée (28 tests backend passants), sécurisée par validation et contrôle d'accès par rôle, versionnée sur GitHub avec un historique de commits détaillé (33 commits) reflétant la progression du travail, de l'implémentation initiale jusqu'aux corrections de bugs et à la migration vers les Form Requests.
