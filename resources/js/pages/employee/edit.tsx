import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React from 'react';
import InputError from '@/components/input-error';
import type { BreadcrumbItem } from '@/types';

export default function Edit({employee}) {

    const {data, setData, put, processing, errors } = useForm({
        name: employee.name,
        email: employee.email,
        password: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Employee',
            href: route('employees.index'),
        },{
            title: '/',
            href: route('employees.edit', employee.id)}
    ];

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('employees.update', employee.id))
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Employee" />

            <div className="m-3">
                <p className="text-3xl font-bold">Edit Employee</p>
            </div>

            <div className='w-8/12 p-4'>
                <form onSubmit={handleUpdate} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor="employee name">Name</Label>
                        <Input
                            placeholder="John"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="employee email">Email</Label>
                        <Input
                            placeholder="john@ams.co"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)} />
                        <InputError message={errors.email} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="employee password">Password (New Password)</Label>
                        <Input
                            type="password"
                            placeholder="123456"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)} />
                        <InputError message={errors.password} />
                    </div>
                    <Button disabled={processing} type="submit">
                        {processing ? 'Updating...' : 'Update Employee'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}
