<?php

namespace Tests\Feature;

use App\Models\Categorie;
use App\Models\Produit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProduitApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_la_liste_des_produits_est_accessible()
    {
        $categorie = Categorie::create(['nom' => 'Légumes']);
        Produit::create([
            'nom' => 'Tomates',
            'prix' => 500,
            'stock' => 10,
            'categorie_id' => $categorie->id,
        ]);

        $response = $this->getJson('/api/produits');

        $response->assertStatus(200);
        $response->assertJsonFragment(['nom' => 'Tomates']);
    }

    public function test_ajout_produit_sans_authentification_est_refuse()
    {
        $categorie = Categorie::create(['nom' => 'Fruits']);

        $response = $this->postJson('/api/produits', [
            'nom' => 'Bananes',
            'prix' => 300,
            'stock' => 20,
            'categorie_id' => $categorie->id,
        ]);

        $response->assertStatus(401);
    }

    public function test_inscription_sans_email_est_refusee()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('email');
    }
}
