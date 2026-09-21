<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    private function creerUtilisateur(string $email = 'client@example.com'): User
    {
        return User::create([
            'name' => 'Client Test',
            'email' => $email,
            'password' => Hash::make('password123'),
            'role' => 'client',
        ]);
    }

    public function test_inscription_valide_cree_un_client_et_retourne_un_token()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Nouveau Client',
            'email' => 'nouveau@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['user' => ['id', 'name', 'email'], 'token']);
        $this->assertDatabaseHas('users', [
            'email' => 'nouveau@example.com',
            'role' => 'client',
        ]);
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

    public function test_inscription_avec_email_deja_utilise_est_refusee()
    {
        $this->creerUtilisateur('doublon@example.com');

        $response = $this->postJson('/api/register', [
            'name' => 'Autre',
            'email' => 'doublon@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('email');
    }

    public function test_inscription_avec_confirmation_differente_est_refusee()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'autrechose',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('password');
    }

    public function test_connexion_valide_retourne_un_token()
    {
        $this->creerUtilisateur('client@example.com');

        $response = $this->postJson('/api/login', [
            'email' => 'client@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['user' => ['id', 'email'], 'token']);
    }

    public function test_connexion_avec_mauvais_mot_de_passe_est_refusee()
    {
        $this->creerUtilisateur('client@example.com');

        $response = $this->postJson('/api/login', [
            'email' => 'client@example.com',
            'password' => 'mauvaismdp',
        ]);

        $response->assertStatus(401);
    }

    public function test_profil_sans_authentification_est_refuse()
    {
        $response = $this->getJson('/api/profil');

        $response->assertStatus(401);
    }

    public function test_un_utilisateur_connecte_voit_son_profil()
    {
        $user = $this->creerUtilisateur('client@example.com');
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/profil');

        $response->assertStatus(200);
        $response->assertJsonFragment(['email' => 'client@example.com']);
    }

    public function test_un_utilisateur_peut_modifier_son_profil()
    {
        $user = $this->creerUtilisateur('client@example.com');
        Sanctum::actingAs($user);

        $response = $this->putJson('/api/profil', [
            'name' => 'Nom Modifie',
            'email' => 'modifie@example.com',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Nom Modifie',
            'email' => 'modifie@example.com',
        ]);
    }

    public function test_modification_profil_avec_email_dun_autre_utilisateur_est_refusee()
    {
        $this->creerUtilisateur('autre@example.com');
        $user = $this->creerUtilisateur('client@example.com');
        Sanctum::actingAs($user);

        $response = $this->putJson('/api/profil', [
            'name' => 'Client Test',
            'email' => 'autre@example.com',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('email');
    }

    public function test_modification_profil_en_gardant_son_propre_email_est_acceptee()
    {
        $user = $this->creerUtilisateur('client@example.com');
        Sanctum::actingAs($user);

        $response = $this->putJson('/api/profil', [
            'name' => 'Nouveau Nom',
            'email' => 'client@example.com',
        ]);

        $response->assertStatus(200);
    }
}
