export const calculatePaginationData = (total, page, perPage) => {
    const totalCount = total,
        totalPages = Math.ceil(totalCount / perPage),
        hasNextPage = page < totalPages,
        hasPreviousPage = page > 1;
    return {
        currentPage: page,
        perPage,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };
};