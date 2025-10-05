import { Head, Link, router } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, SquarePen, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employee',
        href: route('employees.index'),
    },
];

export default function Index({users}) {

    function handleEdit(id: number) {
        router.visit(route('employees.edit', id));
    }

    function handleDelete(id: number) {
        if (confirm('Yakin mau hapus?')) {
            router.delete(route('employees.destroy', id));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee" />
            <div className="p-4">
                <div className="flex justify-end">
                    <Link href={route('employees.create')}>
                        <Button size="sm">
                            <Plus /> Add Employee
                        </Button>
                    </Link>
                </div>
                <Table>
                    <TableCaption>A list of employees</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            users.map((user, i) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{i + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Button className="mx-2" variant="outline" size="icon" onClick={() => handleEdit(user.id)}>
                                            <SquarePen />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(user.id)}>
                                            <Trash />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    )
}
