import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, SquarePen, Trash } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Shift',
        href: route('shift.index'),
    },
];

export default function Index({shifts}){
    function handleEdit(id: number) {
        router.visit(route('shift.edit', id));
    }

    function handleDelete(id: number) {
        if (confirm('Yakin mau hapus?')) {
            router.delete(route('shift.destroy', id));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shift"/>
            <div className="p-4">
                <div className="flex justify-end">
                    <Link href={route('shift.create')}>
                        <Button size="sm">
                            <Plus /> Add Shift
                        </Button>
                    </Link>
                </div>
                <Table>
                    {
                        shifts && shifts.length > 0 && (
                            <TableCaption>A list of Shifts</TableCaption>
                        )
                    }
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Start Time</TableHead>
                            <TableHead>End Time</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            shifts && shifts.length > 0 ? (
                                shifts.map((shift, i) => (
                                    <TableRow key={shift.id}>
                                        <TableCell className="font-medium">{i + 1}</TableCell>
                                        <TableCell>{shift.name}</TableCell>
                                        <TableCell>{shift.start_time.substring(0, 5)}</TableCell>
                                        <TableCell>{shift.end_time.substring(0, 5)}</TableCell>
                                        <TableCell>
                                            <Button className="mx-2" variant="outline" size="icon" onClick={() => handleEdit(shift.id)}>
                                                <SquarePen />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={() => handleDelete(shift.id)}>
                                                <Trash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        <div className="flex flex-col items-center justify-center">
                                            <p>No shift data was found.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    )
}
