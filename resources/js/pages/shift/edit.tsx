import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { CircleAlert, CircleArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Edit({shift}){
    const {data, setData, put, processing, errors } = useForm({
        name: shift.name,
        start_time: shift.start_time,
        end_time: shift.end_time,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('shift.update', shift.id))
    }

    return(
        <AppLayout breadcrumbs={[{title: 'Edit Shift', href: route('shift.edit', shift.id)}]}>
            <Head title="Edit Shift"/>

            <div className="m-3">
                <Link href={route('shift.index')}>
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
                        <Input placeholder="Shift 1" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee price">Start Time</Label>
                        <Input type="time" value={data.start_time} onChange={(e) => { const timeValue = e.target.value; setData('start_time', timeValue + ':00');}}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="employee password">End Time</Label>
                        <Input type="time" value={data.end_time} onChange={(e) => { const timeValue = e.target.value; setData('end_time', timeValue + ':00');}}></Input>
                    </div>
                    <Button disabled={processing} type="submit">Update Shift</Button>
                </form>
            </div>
        </AppLayout>
    )
}
