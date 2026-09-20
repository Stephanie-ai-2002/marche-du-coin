<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Produit;
use Illuminate\Database\Seeder;

class CategorieProduitSeeder extends Seeder
{
    public function run(): void
    {
        $legumes = Categorie::create(['nom' => 'Légumes', 'description' => 'Produits frais du potager']);
        $fruits = Categorie::create(['nom' => 'Fruits', 'description' => 'Fruits de saison']);
        $artisanat = Categorie::create(['nom' => 'Artisanat', 'description' => 'Produits faits main']);

        Produit::create([
            'nom' => 'Tomates',
            'description' => 'Tomates fraîches du jardin',
            'prix' => 500,
            'stock' => 50,
            'categorie_id' => $legumes->id,
        ]);

        Produit::create([
            'nom' => 'Carottes',
            'description' => 'Carottes bio',
            'prix' => 300,
            'stock' => 40,
            'categorie_id' => $legumes->id,
        ]);

        Produit::create([
            'nom' => 'Bananes',
            'description' => 'Bananes mûres à point',
            'prix' => 400,
            'stock' => 60,
            'categorie_id' => $fruits->id,
        ]);

        Produit::create([
            'nom' => 'Panier tressé',
            'description' => 'Panier artisanal en osier',
            'prix' => 2500,
            'stock' => 15,
            'categorie_id' => $artisanat->id,
        ]);
    }
}