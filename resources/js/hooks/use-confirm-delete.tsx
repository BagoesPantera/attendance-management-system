import Swal from 'sweetalert2';

export const useConfirmDelete = () => {
    const confirmDelete = (callback: () => void, options: { title?: string; text?: string } = {}) => {
        const isDarkMode = document.documentElement.classList.contains('dark');

        const swalConfig = {
            background: isDarkMode ? '#242424' : '#ffffff',
            color: isDarkMode ? '#f9fafb' : '#1f2937',
        };

        Swal.fire({
            title: options.title || 'Are you sure?',
            text: options.text || "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: swalConfig.background,
            color: swalConfig.color,
        }).then((result) => {
            if (result.isConfirmed) {
                callback();
            }
        });
    };

    return { confirmDelete };
};
