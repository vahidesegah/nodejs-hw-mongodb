import path from 'node:path';


export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const SMTP = {
    SMTP_HOST: "smtp-relay.brevo.com",
    SMTP_PORT: "587",
    SMTP_USER: "8b109b001@smtp-brevo.com",
    SMTP_PASSWORD: "xsmtpsib-fb82c1b2cbaee3dc9b7ebf08672d8eb12da656429d292fe3cce21737a134e333-yqXjp9gO13N2tURI",
    SMTP_FROM: "vahidesegah@gmail.com",
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');