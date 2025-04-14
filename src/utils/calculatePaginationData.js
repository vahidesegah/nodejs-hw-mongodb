export const calculatePaginationData = (count, page, perPage) => {
    const totalPages = Math.ceil(count / perPage),
        hasNextPage = Boolean(totalPages - page),
        hasPreviousPage = page > 1;
    return {
        currentPage: page,
        perPage,
        totalItems: count,
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };
};

