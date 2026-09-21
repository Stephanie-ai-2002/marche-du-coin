-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 21 sep. 2026 à 21:21
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `marche_du_coin`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `nom`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Légumes', 'Produits frais du potager', '2026-09-19 14:39:21', '2026-09-19 14:39:21'),
(2, 'Fruits', 'Fruits de saison', '2026-09-19 14:39:21', '2026-09-19 14:39:21'),
(3, 'Artisanat', 'Produits faits main', '2026-09-19 14:39:21', '2026-09-19 14:39:21');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `utilisateur_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `statut` varchar(255) NOT NULL DEFAULT 'en_attente',
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id`, `utilisateur_id`, `date`, `statut`, `total`, `created_at`, `updated_at`) VALUES
(1, 2, '2026-09-20', 'en_attente', 800.00, '2026-09-20 06:47:46', '2026-09-20 06:47:46'),
(2, 2, '2026-09-20', 'en_attente', 2800.00, '2026-09-20 06:59:01', '2026-09-20 06:59:01'),
(3, 2, '2026-09-20', 'en_attente', 1000.00, '2026-09-20 07:24:01', '2026-09-20 07:24:01'),
(4, 2, '2026-09-20', 'en_attente', 1000.00, '2026-09-20 07:24:20', '2026-09-20 07:24:20'),
(5, 2, '2026-09-20', 'en_attente', 1500.00, '2026-09-20 07:26:54', '2026-09-20 07:26:54'),
(6, 2, '2026-09-20', 'en_attente', 1500.00, '2026-09-20 07:31:45', '2026-09-20 07:31:45'),
(7, 2, '2026-09-20', 'en_attente', 1500.00, '2026-09-20 07:57:56', '2026-09-20 07:57:56'),
(8, 2, '2026-09-20', 'en_attente', 600.00, '2026-09-20 07:58:39', '2026-09-20 07:58:39'),
(9, 2, '2026-09-20', 'en_attente', 400.00, '2026-09-20 08:19:00', '2026-09-20 08:19:00'),
(10, 2, '2026-09-20', 'en_attente', 1000.00, '2026-09-20 08:25:43', '2026-09-20 08:25:43'),
(11, 2, '2026-09-21', 'en_attente', 500.00, '2026-09-21 11:10:04', '2026-09-21 11:10:04'),
(12, 3, '2026-09-21', 'en_attente', 500.00, '2026-09-21 12:58:51', '2026-09-21 12:58:51');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `lignes_commande`
--

CREATE TABLE `lignes_commande` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `commande_id` bigint(20) UNSIGNED NOT NULL,
  `produit_id` bigint(20) UNSIGNED NOT NULL,
  `quantite` int(11) NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `lignes_commande`
--

INSERT INTO `lignes_commande` (`id`, `commande_id`, `produit_id`, `quantite`, `prix_unitaire`, `created_at`, `updated_at`) VALUES
(1, 2, 2, 1, 300.00, '2026-09-20 06:59:01', '2026-09-20 06:59:01'),
(2, 2, 4, 1, 2500.00, '2026-09-20 06:59:02', '2026-09-20 06:59:02'),
(3, 3, 1, 2, 500.00, '2026-09-20 07:24:01', '2026-09-20 07:24:01'),
(4, 4, 1, 2, 500.00, '2026-09-20 07:24:20', '2026-09-20 07:24:20'),
(5, 5, 1, 3, 500.00, '2026-09-20 07:26:54', '2026-09-20 07:26:54'),
(6, 6, 1, 3, 500.00, '2026-09-20 07:31:45', '2026-09-20 07:31:45'),
(7, 7, 1, 3, 500.00, '2026-09-20 07:57:56', '2026-09-20 07:57:56'),
(8, 8, 2, 2, 300.00, '2026-09-20 07:58:39', '2026-09-20 07:58:39'),
(9, 9, 3, 1, 400.00, '2026-09-20 08:19:00', '2026-09-20 08:19:00'),
(10, 10, 1, 2, 500.00, '2026-09-20 08:25:43', '2026-09-20 08:25:43'),
(11, 11, 1, 1, 500.00, '2026-09-21 11:10:04', '2026-09-21 11:10:04'),
(12, 12, 1, 1, 500.00, '2026-09-21 12:58:51', '2026-09-21 12:58:51');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_09_16_093732_create_personal_access_tokens_table', 1),
(5, '2026_09_18_061710_create_categories_table', 1),
(6, '2026_09_18_061954_create_produits_table', 1),
(7, '2026_09_18_062220_create_commandes_table', 1),
(8, '2026_09_18_062339_create_lignes_commande_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'e3c77881725352cd6d69ac6a04f26565ba1c9b386e703b23b8ba42e1fac36f45', '[\"*\"]', NULL, NULL, '2026-09-18 05:16:06', '2026-09-18 05:16:06'),
(2, 'App\\Models\\User', 1, 'auth_token', 'b2177c3b0d066db12b060d7b98b773d15f3dcfd586f86fc7d96247c84c908a12', '[\"*\"]', NULL, NULL, '2026-09-18 05:16:40', '2026-09-18 05:16:40'),
(6, 'App\\Models\\User', 2, 'auth_token', '4419be06ae22e18984d6dd5e970b327394aca97e321433499a9efb6f459974f2', '[\"*\"]', NULL, NULL, '2026-09-20 13:24:50', '2026-09-20 13:24:50'),
(9, 'App\\Models\\User', 2, 'auth_token', 'd322c771d6655e6a2ddf2e4aed8716a7789fccf87c9677aaa84b856c7516a564', '[\"*\"]', NULL, NULL, '2026-09-21 10:00:49', '2026-09-21 10:00:49'),
(16, 'App\\Models\\User', 3, 'auth_token', 'a548501c178f8347320e65ef5af4bc1ca51b99a0130e09a7233c3264a9b2d9d2', '[\"*\"]', '2026-09-21 12:41:46', NULL, '2026-09-21 12:41:20', '2026-09-21 12:41:46'),
(17, 'App\\Models\\User', 3, 'auth_token', 'baa6992a4605d679148cc7ad0bc82360e4e2e14e757b437f5b6c4d8b1d13690e', '[\"*\"]', '2026-09-21 12:58:52', NULL, '2026-09-21 12:58:32', '2026-09-21 12:58:52');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `prix` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `categorie_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `nom`, `description`, `prix`, `stock`, `image`, `categorie_id`, `created_at`, `updated_at`) VALUES
(1, 'Tomates', 'Tomates fraîches du jardin', 500.00, 50, 'https://commons.wikimedia.org/wiki/Special:FilePath/Tomatoes.jpg', 1, '2026-09-19 14:39:21', '2026-09-21 12:35:19'),
(2, 'Carottes', 'Carottes bio', 300.00, 40, 'https://commons.wikimedia.org/wiki/Special:FilePath/Carrot.jpg', 1, '2026-09-19 14:39:21', '2026-09-20 13:28:50'),
(3, 'Bananes', 'Bananes mûres à point', 400.00, 60, 'https://commons.wikimedia.org/wiki/Special:FilePath/Cavendish_banana_from_Maracaibo.jpg', 2, '2026-09-19 14:39:21', '2026-09-20 13:29:05'),
(4, 'Panier tressé', 'Panier artisanal en osier', 2500.00, 40, 'https://commons.wikimedia.org/wiki/Special:FilePath/Basket.jpg', 3, '2026-09-19 14:39:21', '2026-09-21 12:36:25');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('4PiTd1KX5GQrOgTTXpVwsEva7OF1NGHkiuAS3n9k', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiME1YU24yNmwySXByeEJOaFpDQlNJZ0xPVzRLaXkzdHFsODdvSUxoVSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1789717637),
('KYvSVtTmDxY1fy5xm2N0nD3N4UBxR97FUyG8UxVq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieTF5Qk96VUkxWEp1bjViNEJBZmhxTEF3RGVrQm42SjFPa0lqcDZKRiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1789715396),
('XYbihReEvwp2E42p4OY77VeW0GjLrEaVbLY0lXEK', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWmdjZGxjdGNQQVNsRlE2QURnZ3NkQjdUTTJFUkQzVW5PRzVETmh6OSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1789896055);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'client',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', NULL, '$2y$12$zbFFEbu7YpGbSMgEIiCgreUtJUjbnQw33q8fEFAMDfMgRmCKglR9O', 'client', NULL, '2026-09-18 05:16:06', '2026-09-18 05:16:06'),
(2, 'HOUNKPATIN', 'stephaniehounkpatin0@gmail.com', NULL, '$2y$12$VKvP.vHYI5ITJ7/DlM3e6ONw3ACy1gxj3RDAj/BDEOxt.AITiYg9i', 'admin', NULL, '2026-09-20 06:46:00', '2026-09-20 06:46:00'),
(3, 'Ana', 'stephaniehounkpatin26@gmail.com', NULL, '$2y$12$fJd/gtxXJ/sUMoAeO72j8eDDQN8BeuDAKTzPY.LSalKhmzGcsfeF.', 'client', NULL, '2026-09-21 12:14:13', '2026-09-21 12:14:13');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commandes_utilisateur_id_foreign` (`utilisateur_id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `lignes_commande`
--
ALTER TABLE `lignes_commande`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lignes_commande_commande_id_foreign` (`commande_id`),
  ADD KEY `lignes_commande_produit_id_foreign` (`produit_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produits_categorie_id_foreign` (`categorie_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `lignes_commande`
--
ALTER TABLE `lignes_commande`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_utilisateur_id_foreign` FOREIGN KEY (`utilisateur_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `lignes_commande`
--
ALTER TABLE `lignes_commande`
  ADD CONSTRAINT `lignes_commande_commande_id_foreign` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lignes_commande_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_categorie_id_foreign` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
