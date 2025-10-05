import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { CircleAlert, CircleArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

export default function Edit({ planning, shifts }) {
    const { data, setData, put, processing, errors } = useForm({
        date: planning.date ? planning.date.split('T')[0] : '', // Format untuk input date
        shift_id: planning.shift_id?.toString() || '', // Convert ke string
        note: planning.note || '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('planning.update', planning.id));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit Planning', href: route('planning.edit', planning.id)}]}>
            <Head title="Edit Planning"/>

            <div className="m-3">
                <Link href={route('planning.index')}>
                    <Button variant="outline">
                        <CircleArrowLeft /> Back
                    </Button>
                </Link>
            </div>

            <div className="p-6">
                <form onSubmit={handleUpdate} className="space-y-4 max-w-md">
                    {/* Display error */}
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

                    {/* Date Input */}
                    <div className='gap-1.5'>
                        <Label htmlFor="date">Date</Label>
                        <Input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            min={new Date().toISOString().split('T')[0]} // Min date today
                        />
                        {errors.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
                    </div>

                    {/* Shift Select */}
                    <div className='gap-1.5'>
                        <Label htmlFor="shift">Shift</Label>
                        <Select
                            value={data.shift_id}
                            onValueChange={(value) => setData('shift_id', value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue>
                                    {data.shift_id ?
                                        shifts?.find(s => s.id.toString() === data.shift_id)?.name || 'Select Shift'
                                        : 'Select Shift'
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {shifts && shifts.length > 0 ? (
                                    shifts.map((shift) => (
                                        <SelectItem key={shift.id} value={shift.id.toString()}>
                                            {shift.name} ({shift.start_time.substring(0, 5)} - {shift.end_time.substring(0, 5)})
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="" disabled>No shifts available</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        {errors.shift_id && <div className="text-red-500 text-sm mt-1">{errors.shift_id}</div>}
                    </div>

                    {/* Note Textarea */}
                    <div className='gap-1.5'>
                        <Label htmlFor="note">Note (Optional)</Label>
                        <Textarea
                            placeholder="Description"
                            value={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                            rows={4}
                        />
                        {errors.note && <div className="text-red-500 text-sm mt-1">{errors.note}</div>}
                    </div>

                    <Button disabled={processing} type="submit">
                        {processing ? 'Updating...' : 'Update Planning'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}
