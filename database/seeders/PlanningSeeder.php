<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlanningSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('plannings')->insert([
            [
                'user_id' => 2,
                'shift_id' => 1,
                'date' => Carbon::today(),
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'user_id' => 2,
                'shift_id' => 2,
                'date' => Carbon::today(),
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
