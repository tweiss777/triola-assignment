export default function calculatePaginationOffset(pageNumber: number, per_page: number) {
    return (pageNumber - 1) * per_page;
}
