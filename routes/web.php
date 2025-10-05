<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\ShiftController;
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
    Route::get('/{user}/edit','edit')->name('employees.edit');
    Route::put('/{user}','update')->name('employees.update');
    Route::delete('/{user}','destroy')->name('employees.destroy');
});

Route::middleware('auth')->controller(PlanningController::class)->prefix('planning')->group(function () {
    Route::get('/', 'index')->name('planning.index');
    Route::get('/create','create')->name('planning.create');
    Route::post('/','store')->name('planning.store');
    Route::get('/{planning}/edit','edit')->name('planning.edit');
    Route::put('/{planning}','update')->name('planning.update');
    Route::delete('/{planning}','destroy')->name('planning.destroy');
});

Route::middleware(['auth', 'is-admin'])->prefix('shift')->controller(ShiftController::class)->group(function () {
    Route::get('/', 'index')->name('shift.index');
    Route::get('/create','create')->name('shift.create');
    Route::post('/','store')->name('shift.store');
    Route::get('/{id}/edit','edit')->name('shift.edit');
    Route::put('/{id}','update')->name('shift.update');
    Route::delete('/{id}','destroy')->name('shift.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
