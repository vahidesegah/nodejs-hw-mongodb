import { DEFAULT_PAGINATION_VALUES, SORT_ORDER, CONTACT_SORT_FIELDS } from "../constants/pagination.js";

export const parseSortParams = (query) => {
    const knownSortOrders = [SORT_ORDER.ASC, SORT_ORDER.DESC];
    const sortOrder = query.sortOrder;
    const isValidSortOrder = knownSortOrders.includes(sortOrder);

    const sortBy = query.sortBy;
    const isValidSortBy = CONTACT_SORT_FIELDS.includes(sortBy);

    return {
        sortOrder: isValidSortOrder ? sortOrder : DEFAULT_PAGINATION_VALUES.sortOrder,
        sortBy: isValidSortBy ? sortBy : DEFAULT_PAGINATION_VALUES.sortBy,
    };
};


