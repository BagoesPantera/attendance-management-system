import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { CircleAlert, CircleArrowLeft } from 'lucide-react';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Shift',
        href: route('shift.create'),
    },
];

export default function Create(){
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        start_time: '',
        end_time: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('shift.store'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Shift" />

            <div className="m-3">
                <Link href={route('shift.index')}>
                    <Button variant="outline">
                        <CircleArrowLeft  /> Back
                    </Button>
                </Link>
            </div>

            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <Input placeholder="Shift 1" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee price">Start Time</Label>
                        <Input type="time" value={data.start_time} onChange={(e) => setData('start_time', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee password">End Time</Label>
                        <Input type="time" value={data.end_time} onChange={(e) => setData('end_time', e.target.value)}></Input>
                    </div>
                    <Button disabled={processing} type="submit">Create Shift</Button>
                </form>
            </div>

        </AppLayout>
    )
}
