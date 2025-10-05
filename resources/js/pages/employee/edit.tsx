import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert, CircleArrowLeft } from 'lucide-react';
import React from 'react';

export default function Edit({employee}) {

    const {data, setData, put, processing, errors } = useForm({
        name: employee.name,
        email: employee.email,
        password: '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('employees.update', employee.id))
    }
    return (
        <AppLayout breadcrumbs={[{title: 'Edit Employee', href: route('employees.edit', employee.id)}]}>
            <Head title="Edit Employee" />

            <div className="m-3">
                <Link href={route('employees.index')}>
                    <Button variant="outline">
                        <CircleArrowLeft  /> Back
                    </Button>
                </Link>
            </div>

            <div className='w-8/12 p-4'>
                <form onSubmit={handleUpdate} className='space-y-4'>
                    {/* Display error  */}
                    {Object.keys(errors).length > 0 &&(
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className='gap-1.5'>
                        <Label htmlFor="employee name">Name</Label>
                        <Input placeholder="John" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee price">Email</Label>
                        <Input placeholder="john@ams.co" value={data.email} onChange={(e) => setData('email', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee password">Password (New Password)</Label>
                        <Input type="password" placeholder="123456" value={data.password} onChange={(e) => setData('password', e.target.value)}></Input>
                    </div>
                    <Button disabled={processing} type="submit">Update Employee</Button>
                </form>
            </div>
        </AppLayout>
    )
}
