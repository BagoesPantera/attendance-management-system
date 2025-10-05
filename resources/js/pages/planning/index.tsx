import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, SquarePen, Trash } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Planning',
        href: route('planning.index'),
    },
];

export default function Index({plannings}){
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
                        !plannings && (
                            <TableCaption>A list of plannings</TableCaption>
                        )
                    }
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Method</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            plannings && plannings.length > 0 ? (
                                plannings.map((planning, i) => (
                                    <TableRow key={planning.id}>
                                        <TableCell className="font-medium">{i + 1}</TableCell>
                                        <TableCell>{planning.name}</TableCell>
                                        <TableCell>{planning.email}</TableCell>
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
