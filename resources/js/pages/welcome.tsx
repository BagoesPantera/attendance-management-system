import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    if (auth.user) {
        window.location.href = '/dashboard'
    } else {
        window.location.href = '/login'
    }

    return (
        <>

        </>
    );
}
