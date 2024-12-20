export const getStatusColor = (status) => {
    switch (status) {
        case 'Completed':
            return 'bg-green-500';
        case 'In Progress':
            return 'bg-yellow-500';
        case 'Pending':
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
}