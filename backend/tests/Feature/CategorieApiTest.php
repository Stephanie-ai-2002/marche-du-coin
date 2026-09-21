<?php

namespace Tests\Feature;

use App\Models\Categorie;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CategorieApiTest extends TestCase
{
    use RefreshDatabase;

    private function creerAdmin(): User
    {
        return User::create([
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);
    }

    public function test_la_liste_des_categories_est_accessible_sans_authentification()
    {
        Categorie::create(['nom' => 'Légumes']);

        $response = $this->getJson('/api/categories');

        $response->assertStatus(200);
        $response->assertJsonFragment(['nom' => 'Légumes']);
    }

    public function test_creation_categorie_sans_authentification_est_refusee()
    {
        $response = $this->postJson('/api/categories', ['nom' => 'Fruits']);

        $response->assertStatus(401);
    }

    public function test_un_admin_peut_creer_une_categorie()
    {
        Sanctum::actingAs($this->creerAdmin());

        $response = $this->postJson('/api/categories', ['nom' => 'Fruits']);

        $response->assertStatus(201);
        $response->assertJsonFragment(['nom' => 'Fruits']);
        $this->assertDatabaseHas('categories', ['nom' => 'Fruits']);
    }

    public function test_creation_categorie_sans_nom_est_refusee()
    {
        Sanctum::actingAs($this->creerAdmin());

        $response = $this->postJson('/api/categories', []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('nom');
    }

    public function test_un_admin_peut_modifier_une_categorie()
    {
        Sanctum::actingAs($this->creerAdmin());
        $categorie = Categorie::create(['nom' => 'Légumes']);

        $response = $this->putJson("/api/categories/{$categorie->id}", ['nom' => 'Légumes frais']);

        $response->assertStatus(200);
        $response->assertJsonFragment(['nom' => 'Légumes frais']);
    }

    public function test_un_admin_peut_supprimer_une_categorie()
    {
        Sanctum::actingAs($this->creerAdmin());
        $categorie = Categorie::create(['nom' => 'Légumes']);

        $response = $this->deleteJson("/api/categories/{$categorie->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('categories', ['id' => $categorie->id]);
    }
}
