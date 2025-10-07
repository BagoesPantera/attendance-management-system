<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('shifts')->insert([
            [
                'name' => 'Pagi',
                'start_time' => Carbon::parse('08:00')->format('H:i'),
                'end_time' => Carbon::parse('11:59')->format('H:i'),
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'name' => 'Siang',
                'start_time' => Carbon::parse('12:00')->format('H:i'),
                'end_time' => Carbon::parse('20:00')->format('H:i'),
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
