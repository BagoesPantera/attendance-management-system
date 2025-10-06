<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShiftAttendance extends Model
{
    /** @use HasFactory<\Database\Factories\ShiftAttendanceFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'planning_id',
        'start_at',
        'end_at',
        'status',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function planning()
    {
        return $this->belongsTo(Planning::class);
    }
}
