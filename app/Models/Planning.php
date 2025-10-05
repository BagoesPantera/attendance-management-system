<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planning extends Model
{
    /** @use HasFactory<\Database\Factories\PlanningFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id','date','planned_start','planned_end','note'
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
