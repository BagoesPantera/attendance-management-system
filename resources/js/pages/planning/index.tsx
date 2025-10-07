import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, SquarePen, Trash } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useConfirmDelete } from '@/hooks/use-confirm-delete';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Planning',
        href: route('planning.index'),
    },
];

export default function Index({plannings}){
    const { confirmDelete } = useConfirmDelete();

    function handleEdit(id: number) {
        router.visit(route('planning.edit', id));
    }

    function handleDelete(id: number) {
        confirmDelete(
            () => {
                router.delete(route('planning.destroy', id));
            },
            {
                title: 'Delete Planning?',
                text: 'This action cannot be undone.'
            }
        );
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Planning" />
            <div className="p-4">
                <div className="flex justify-end">
                    <Link href={route('planning.create')}>
                        <Button size="sm">
                            <Plus /> Add Planning
                        </Button>
                    </Link>
                </div>
                <Table>
                    {
                        plannings && plannings.length > 0 && (
                            <TableCaption>A list of plannings</TableCaption>
                        )
                    }
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Shift</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            plannings && plannings.length > 0 ? (
                                plannings.map((planning, i) => (
                                    <TableRow key={planning.id}>
                                        <TableCell className="font-medium">{i + 1}</TableCell>
                                        <TableCell>
                                            {planning.date ? new Date(planning.date).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            }) : '-'}
                                        </TableCell>
                                        <TableCell>{planning.shift.name} ({planning.shift.start_time.substring(0, 5)} - {planning.shift.end_time.substring(0, 5)})</TableCell>
                                        <TableCell>
                                            <Button className="mx-2" variant="outline" size="icon" onClick={() => handleEdit(planning.id)}>
                                                <SquarePen />
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={() => handleDelete(planning.id)}>
                                                <Trash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        <div className="flex flex-col items-center justify-center">
                                            <p>No planning data was found.</p>
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
