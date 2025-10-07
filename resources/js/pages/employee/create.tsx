import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { CircleArrowLeft } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Employee',
        href: route('employees.create'),
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('employees.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Employee" />

            <div className="m-3">
                <Link href={route('employees.index')}>
                    <Button variant="outline">
                        <CircleArrowLeft  /> Back
                    </Button>
                </Link>
            </div>

            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='gap-1.5'>
                        <Label htmlFor="employee name">Name</Label>
                        <Input
                            placeholder="John"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee email">Email</Label>
                        <Input
                            placeholder="john@amg.co"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)} />
                        <InputError message={errors.email} />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee password">Password</Label>
                        <Input
                            type="password"
                            placeholder="123456"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)} />
                        <InputError message={errors.password} />
                    </div>
                    <Button disabled={processing} type="submit">
                        {processing ? 'Creating...' : 'Create Employee'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
