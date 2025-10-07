import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    SquarePen,
    Trash,
} from 'lucide-react';

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

    const handlePrevious = () => {
        if (users.links[0].url) {
            router.visit(users.links[0].url);
        }
    };

    const handleNext = () => {
        if (users.links[users.links.length - 1].url) {
            router.visit(users.links[users.links.length - 1].url);
        }
    };

    const handlePageClick = (url: string) => {
        router.visit(url);
    };
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
                        {users.data.length > 0 ? (
                            users.data.map((user, i) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        {users.from + i}
                                    </TableCell>
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
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">
                                    No employees found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                {users.total > users.per_page && (
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm text-gray-500">
                            Showing {users.from} to {users.to} of {users.total} results
                        </div>

                        <div className="flex items-center space-x-2">
                            {/* Previous Button */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePrevious}
                                disabled={!users.links[0].url}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>

                            {/* Page Numbers */}
                            <div className="flex space-x-1">
                                {users.links.slice(1, -1).map((link: any, index: number) => (
                                    <Button
                                        key={index}
                                        variant={link.active ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageClick(link.url)}
                                        disabled={!link.url}
                                    >
                                        {link.label}
                                    </Button>
                                ))}
                            </div>

                            {/* Next Button */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleNext}
                                disabled={!users.links[users.links.length - 1].url}
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
