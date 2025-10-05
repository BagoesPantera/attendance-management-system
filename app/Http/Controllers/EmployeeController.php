<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'employee')->get();
        return Inertia::render('employee/index', ['users' => $users]);
    }

    public function create()
    {
        return Inertia::render('employee/create');
    }

    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('employees.index')->with('success', 'Employee created successfully!');
    }

    public function edit($id)
    {
        $employee = User::findOrFail($id);
        return Inertia::render('employee/edit', compact('employee'));
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$id,
            'password' => 'nullable|string|min:6',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
                ? Hash::make($request->password)
                : $user->password,
        ]);

        return redirect()->route('employees.index')->with('success', 'Employee updated successfully!');
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return redirect()->route('employees.index')->with('success', 'Employee deleted successfully!');
    }
}
