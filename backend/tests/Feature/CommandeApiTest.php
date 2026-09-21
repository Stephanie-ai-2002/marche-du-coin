<?php

namespace Tests\Feature;

use App\Models\Categorie;
use App\Models\Commande;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CommandeApiTest extends TestCase
{
    use RefreshDatabase;

    private function creerUtilisateur(string $role = 'client'): User
    {
        return User::create([
            'name' => 'Utilisateur Test',
            'email' => $role . '@test.com',
            'password' => Hash::make('password123'),
            'role' => $role,
        ]);
    }

    private function creerProduit(): Produit
    {
        $categorie = Categorie::create(['nom' => 'Légumes']);

        return Produit::create([
            'nom' => 'Tomates',
            'prix' => 500,
            'stock' => 10,
            'categorie_id' => $categorie->id,
        ]);
    }

    public function test_creation_commande_sans_authentification_est_refusee()
    {
        $produit = $this->creerProduit();

        $response = $this->postJson('/api/commandes', [
            'articles' => [
                ['produit_id' => $produit->id, 'quantite' => 2],
            ],
        ]);

        $response->assertStatus(401);
    }

    public function test_un_client_peut_creer_une_commande()
    {
        $client = $this->creerUtilisateur('client');
        $produit = $this->creerProduit();
        Sanctum::actingAs($client);

        $response = $this->postJson('/api/commandes', [
            'articles' => [
                ['produit_id' => $produit->id, 'quantite' => 2],
            ],
        ]);

        $response->assertStatus(201);
        $response->assertJsonFragment(['statut' => 'en_attente']);
        $this->assertDatabaseHas('commandes', [
            'utilisateur_id' => $client->id,
            'total' => 1000,
        ]);
        $this->assertDatabaseHas('lignes_commande', [
            'produit_id' => $produit->id,
            'quantite' => 2,
        ]);
    }

    public function test_creation_commande_sans_articles_est_refusee()
    {
        $client = $this->creerUtilisateur('client');
        Sanctum::actingAs($client);

        $response = $this->postJson('/api/commandes', ['articles' => []]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('articles');
    }

    public function test_un_client_ne_voit_que_ses_propres_commandes()
    {
        $client1 = $this->creerUtilisateur('client');
        $client2 = User::create([
            'name' => 'Autre Client',
            'email' => 'client2@test.com',
            'password' => Hash::make('password123'),
            'role' => 'client',
        ]);
        $produit = $this->creerProduit();

        Sanctum::actingAs($client1);
        $this->postJson('/api/commandes', [
            'articles' => [['produit_id' => $produit->id, 'quantite' => 1]],
        ]);

        Sanctum::actingAs($client2);
        $this->postJson('/api/commandes', [
            'articles' => [['produit_id' => $produit->id, 'quantite' => 3]],
        ]);

        $response = $this->getJson('/api/commandes');

        $response->assertStatus(200);
        $response->assertJsonCount(1);
    }

    public function test_un_admin_voit_toutes_les_commandes()
    {
        $client = $this->creerUtilisateur('client');
        $produit = $this->creerProduit();

        Sanctum::actingAs($client);
        $this->postJson('/api/commandes', [
            'articles' => [['produit_id' => $produit->id, 'quantite' => 1]],
        ]);

        $admin = $this->creerUtilisateur('admin');
        Sanctum::actingAs($admin);

        $response = $this->getJson('/api/commandes');

        $response->assertStatus(200);
        $response->assertJsonCount(1);
    }

    public function test_seul_un_admin_peut_modifier_le_statut_dune_commande()
    {
        $client = $this->creerUtilisateur('client');
        $commande = Commande::create([
            'utilisateur_id' => $client->id,
            'date' => now(),
            'statut' => 'en_attente',
            'total' => 500,
        ]);

        Sanctum::actingAs($client);
        $response = $this->putJson("/api/commandes/{$commande->id}", [
            'statut' => 'confirmee',
        ]);
        $response->assertStatus(403);

        $admin = $this->creerUtilisateur('admin');
        Sanctum::actingAs($admin);
        $response = $this->putJson("/api/commandes/{$commande->id}", [
            'statut' => 'confirmee',
        ]);
        $response->assertStatus(200);
        $response->assertJsonFragment(['statut' => 'confirmee']);
    }

    public function test_le_statut_doit_etre_une_valeur_valide()
    {
        $admin = $this->creerUtilisateur('admin');
        $commande = Commande::create([
            'utilisateur_id' => $admin->id,
            'date' => now(),
            'statut' => 'en_attente',
            'total' => 500,
        ]);
        Sanctum::actingAs($admin);

        $response = $this->putJson("/api/commandes/{$commande->id}", [
            'statut' => 'expediee',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('statut');
    }
}
