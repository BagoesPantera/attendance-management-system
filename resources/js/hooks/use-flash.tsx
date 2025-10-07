import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

interface Flash {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
}

export const useFlash = () => {
    const { flash } = usePage().props;

    useEffect(() => {
        const flashData = flash as Flash;

        const isDarkMode = document.documentElement.classList.contains('dark');

        const swalConfig = {
            background: isDarkMode ? '#242424' : '#ffffff',
            color: isDarkMode ? '#f9fafb' : '#1f2937',
            confirmButtonColor: isDarkMode ? '#3b82f6' : '#2563eb',
        };

        if (flashData.success) {
            Swal.fire({
                title: 'Success!',
                text: flashData.success,
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000,
                timerProgressBar: true,
                background: swalConfig.background,
                color: swalConfig.color,
                confirmButtonColor: swalConfig.confirmButtonColor,
            });
        }

        if (flashData.error) {
            Swal.fire({
                title: 'Error!',
                text: flashData.error,
                icon: 'error',
                confirmButtonText: 'OK',
                background: swalConfig.background,
                color: swalConfig.color,
                confirmButtonColor: swalConfig.confirmButtonColor,
            });
        }

        if (flashData.warning) {
            Swal.fire({
                title: 'Warning!',
                text: flashData.warning,
                icon: 'warning',
                confirmButtonText: 'OK',
                background: swalConfig.background,
                color: swalConfig.color,
                confirmButtonColor: swalConfig.confirmButtonColor,
            });
        }

        if (flashData.info) {
            Swal.fire({
                title: 'Info!',
                text: flashData.info,
                icon: 'info',
                confirmButtonText: 'OK',
                timer: 3000,
                timerProgressBar: true,
                background: swalConfig.background,
                color: swalConfig.color,
                confirmButtonColor: swalConfig.confirmButtonColor,
            });
        }
    }, [flash]);
};
