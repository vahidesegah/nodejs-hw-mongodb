import { DEFAULT_PAGINATION_VALUES } from "../constants/pagination.js";

const parseNumber = (number, defaultValue) => {
    const isString = typeof number === "string";
    if(!isString) return defaultValue;

    const parsedNumber = parseInt(number);
    if (Number.isNaN(parsedNumber)) {
        return defaultValue;
        }
    
    return parsedNumber;

};

export const parsePaginationParams = (query) => {
    const { page, perPage } = query;

    const parsedPage = parseNumber(page, DEFAULT_PAGINATION_VALUES.page);
    const parsedPerPage = parseNumber(perPage, DEFAULT_PAGINATION_VALUES.perPage);

    return {
        page: parsedPage,
        perPage: parsedPerPage,
    };
};