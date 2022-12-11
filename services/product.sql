-- Base de données : `test`
-- --------------------------------------------------------

CREATE DATABASE products;
use products;

-- Structure de la table `products`
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL
);

-- Déchargement des données de la table `products`
INSERT INTO `products` (`id`, `name`, `price`, `description`) VALUES
(1, 'Table', '120', 'Un belle table de salle à manger'),
(2, 'PC', '780', 'Léger ordinateur de travail. Idéal pour étudiant ');

-- Structure de la table `product_user`
CREATE TABLE `product_user` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
);

-- Déchargement des données de la table `product_user`
-- INSERT INTO `product_user` (`id`, `product_id`, `user_id`) VALUES
-- (1, 2, 1),
-- (2, 1, 2),
-- (3, 1, 1);

-- --------------------------------------------------------

-- Structure de la table `roles`
CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
);

-- Déchargement des données de la table `roles`
INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'guest');

-- --------------------------------------------------------

-- Structure de la table `users`
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL
);

-- Déchargement des données de la table `users`
-- INSERT INTO `users` (`id`, `username`, `password`, `email`, `address`, `role_id`) VALUES
-- (1, 'naoufel', 'RootRoot1', 'naoufel@hotmail.fr', '5 rue des bleuets', 1),
-- (2, 'said', 'SaidSaid!', 'said@hotmail.fr', '8 rue de la chance', 2);

-- Index pour la table `products`
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

-- Index pour la table `product_user`
ALTER TABLE `product_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_user_products` (`product_id`),
  ADD KEY `product_user_users` (`user_id`);

-- Index pour la table `roles`
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

-- Index pour la table `users`
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_roles` (`role_id`);

-- AUTO_INCREMENT pour la table `products`
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- AUTO_INCREMENT pour la table `product_user`
ALTER TABLE `product_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- AUTO_INCREMENT pour la table `roles`
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- AUTO_INCREMENT pour la table `users`
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- Contraintes pour la table `product_user`
ALTER TABLE `product_user`
  ADD CONSTRAINT `product_user_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_user_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Contraintes pour la table `users`
ALTER TABLE `users`
  ADD CONSTRAINT `users_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

