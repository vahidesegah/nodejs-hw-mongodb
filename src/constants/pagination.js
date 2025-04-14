export const SORT_ORDER = {
    ASC: `asc`,
    DSC: `desc`,
};


export const DEFAULT_PAGINATION_VALUES = {
    page: 1,
    perPage: 10,
    sortOrder: SORT_ORDER.ASC,
    sortBy: "_id",
};


export const CONTACT_SORT_FIELDS = [
    "_id",
    "name",
    "phoneNumber",
    "email",
    "isFavorite",
    "contactType",
    "createdAt",
    "updatedAt",
];