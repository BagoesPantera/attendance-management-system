<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::user()){
        return redirect()->route('dashboard');
    } else {
        return redirect()->route('login');
    }
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'is-admin'])->prefix('employees')->controller(EmployeeController::class)->group(function () {
    Route::get('/', 'index')->name('employees.index');
    Route::get('/create','create')->name('employees.create');
    Route::post('/','store')->name('employees.store');
    Route::get('/{id}/edit','edit')->name('employees.edit');
    Route::put('/{id}','update')->name('employees.update');
    Route::delete('/{id}','destroy')->name('employees.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
