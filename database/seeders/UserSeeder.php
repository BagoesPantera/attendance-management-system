<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'admin',
                'email' => 'admin@admin',
                'role' => 'admin',
                'password' => Hash::make('123'),
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'name' => fake()->name(),
                'email' => 'a@a',
                'password' => Hash::make('123'),
                'role' => 'employee',
                'created_at' => now(),
                'updated_at' => now()
            ]]);
        User::factory(100)->create();
    }
}
